const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
  startAttempt,
  submitAttempt,
  shuffleQuestions,
} = require('../models/attempts.model');
const prisma = require('../prisma/Client');

const router = express.Router();

// Start a new attempt
router.post('/', auth, async (req, res) => {
  const quiz_id = parseInt(req.body.quiz_id);
  const user_id = parseInt(req.user.user_id);
  console.log(user_id, quiz_id);

  const { error } = startAttempt({ quiz_id, user_id });
  if (error) return res.status(400).send(error.details[0].message);

  //   Get questions for the attempt including answers
  const questions = await prisma.question.findMany({
    where: {
      quiz_id: quiz_id,
    },
    orderBy: {
      question_id: 'asc',
    },
    select: {
      question_id: true,
      content: true,
      answers: {
        select: {
          answer_id: true,
          content: true,
        },
      },
    },
  });

  //   Get question_count from Quiz table
  const questionCount = await prisma.quiz.findUnique({
    where: {
      quiz_id: quiz_id,
    },
    select: {
      question_count: true,
    },
  });

  const shuffledQuestions = shuffleQuestions(
    questions,
    questionCount.question_count
  );

  const attempt = await prisma.quizAttempt.create({
    data: {
      quiz: {
        connect: {
          quiz_id: quiz_id,
        },
      },
      user: {
        connect: {
          user_id: user_id,
        },
      },
      question_count: questionCount.question_count,
    },
  });

  res.status(201).json({ attempt, shuffledQuestions });
});

//Get all attempts of user
router.get('/me', auth, async (req, res) => {
  const user_id = parseInt(req.user.user_id);
  const attempts = await prisma.quizAttempt.findMany({
    where: {
      user_id: user_id,
    },
    include: {
      userAnswers: {
        include: {
          answer: true,
          question: {
            include: {
              answers: true,
            },
          },
        },
      },
      quiz: true,
    },
    orderBy: {
      attempt_id: 'desc',
    },
  });
  res.json(attempts);
});

//Get all attempts of a quiz or user
router.get('/', auth, admin, async (req, res) => {
  let query = {};
  if (req.query.quiz_id) {
    const quiz_id = parseInt(req.query.quiz_id);
    query = { ...query, quiz_id: quiz_id };
  }
  if (req.query.user_id) {
    const user_id = parseInt(req.query.user_id);
    query = { ...query, user_id: user_id };
  }

  const attempts = await prisma.quizAttempt.findMany({
    where: { ...query },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      quiz: {
        select: {
          title: true,
          description: true,
        },
      },
    },
    orderBy: {
      attempt_id: 'desc',
    },
  });
  res.json(attempts);
});

// Get an attempt
router.get('/:attempt_id', auth, admin, async (req, res) => {
  const attempt = await prisma.quizAttempt.findUnique({
    where: {
      attempt_id: parseInt(req.params.attempt_id),
    },
    include: {
      userAnswers: true, // TODO: include questions
    },
  });
  if (!attempt) return res.status(404).send('Attempt not found.');
  res.json(attempt);
});

// Submit an attempt
router.post('/:attempt_id', auth, async (req, res) => {
  // First create UserAnswers from req.body
  const { error } = submitAttempt(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const attempt_id = parseInt(req.params.attempt_id);
  const data = req.body.answers.map((answer) => ({
    attempt_id: attempt_id,
    question_id: answer.question_id,
    answer_id: answer.answer_id,
  }));

  const userAnswers = await prisma.userAnswer.createMany({
    data: data,
  });

  // Then calculate score
  const userAnswersWithAnswers = await prisma.userAnswer.findMany({
    where: {
      attempt_id: attempt_id,
    },
    include: {
      answer: true,
    },
  });

  const score = userAnswersWithAnswers.reduce((acc, userAnswer) => {
    if (userAnswer.answer.is_correct) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  // Then update Attempt score
  const attempt = await prisma.quizAttempt.update({
    where: {
      attempt_id: attempt_id,
    },
    data: {
      score: score,
    },
  });

  res.json(attempt);
});

// Delete an attempt
router.delete('/:attempt_id', auth, async (req, res) => {
  const attempt_id = parseInt(req.params.attempt_id);
  const attempt = await prisma.quizAttempt.findUnique({
    where: {
      attempt_id: attempt_id,
      user_id: req.user.user_id,
    },
  });
  if (!attempt) return res.status(404).send('Attempt not found.');

  try {
    const result = await prisma.$transaction(async (tx) => {
      await tx.userAnswer.deleteMany({
        where: {
          attempt_id: attempt_id,
        },
      });

      const deletedAttempt = await tx.quizAttempt.delete({
        where: {
          attempt_id: attempt_id,
          user_id: req.user.user_id,
        },
      });
      return deletedAttempt;
    });

    res.json((message = 'Attempt deleted')).send(result);
  } catch (error) {
    console.error('Delete attempt error:', error);
    res.status(500).send('Error deleting attempt');
  }
});

module.exports = router;
