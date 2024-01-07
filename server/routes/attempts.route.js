const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { startAttempt, submitAttempt } = require('../models/attempts.model');
const prisma = require('../prisma/Client');

const router = express.Router();

// Start a new attempt
router.post('/', auth, async (req, res) => {
  const quiz_id = parseInt(req.query.quiz_id);
  const user_id = parseInt(req.user.user_id);

  const { error } = startAttempt({ quiz_id, user_id });
  if (error) return res.status(400).send(error.details[0].message);

  //   Get questions for the attempt including
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

  res.status(201).json({ attempt, questions });
});

module.exports = router;

//Get all attempts of user
router.get('/me', auth, async (req, res) => {
  const user_id = parseInt(req.user.user_id);
  const attempts = await prisma.quizAttempt.findMany({
    where: {
      user_id: user_id,
    },
    include: {
      userAnswers: true,
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
    query = { ...query, 'quiz_id': quiz_id };
  }
  if (req.query.user_id) {
    const user_id = parseInt(req.query.user_id);
    query = { ...query, 'user_id': user_id };
  }

  const attempts = await prisma.quizAttempt.findMany({
    where: { ...query },
    include: {
      userAnswers: true,
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
      userAnswers: true,
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

module.exports = router;
