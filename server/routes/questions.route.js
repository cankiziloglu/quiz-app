const express = require('express');
const _ = require('lodash');
const prisma = require('../prisma/Client');
const { validate } = require('../models/questions.model');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router({ mergeParams: true });

// Get all questions of a quiz
router.get('/', auth, admin, async (req, res) => {
  const questions = await prisma.question.findMany({
    where: {
      quiz_id: parseInt(req.params.quiz_id),
    },
    include: {
      answers: true,
    },
    orderBy: {
      question_id: 'asc',
    },
  });
  res.json(questions);
});

// Create a new question for a quiz
router.post('/', auth, admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const quiz_id = parseInt(req.params.quiz_id);

  const data = _.pick(req.body, ['content', 'answers']);
  const question = await prisma.question.create({
    data: {
      content: data.content,
      quiz: {
        connect: {
          quiz_id: quiz_id,
        },
      },
      answers: {
        create: data.answers,
      },
    },
    include: {
      answers: true,
    },
  });
  res.status(201).json(question);
});

module.exports = router;

// Get a question of a quiz
router.get('/:question_id', auth, admin, async (req, res) => {
  const question = await prisma.question.findUnique({
    where: {
      question_id: parseInt(req.params.question_id),
    },
    include: {
      answers: true,
    },
  });
  if (!question) return res.status(404).send('Question not found.');
  res.json(question);
});

// Update a question of a quiz
router.put('/:question_id', auth, admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question_id = parseInt(req.params.question_id);

  const data = _.pick(req.body, ['content', 'answers']);
  const question = await prisma.question.update({
    where: {
      question_id: question_id,
    },
    data: {
      content: data.content,
      answers: {
        deleteMany: {},
        create: data.answers,
      },
    },
    include: {
      answers: true,
    },
  });
  if (!question) return res.status(404).send('Question not found.');

  res.json(question);
});

// Delete a question with all its answers
router.delete('/:question_id', auth, admin, async (req, res) => {
  const question_id = parseInt(req.params.question_id);

  // check if question exists
  const question = await prisma.question.findUnique({
    where: {
      question_id: question_id,
    },
  });
  if (!question) return res.status(404).send('Question not found.');

  // Delete a question and all their answers with two separate queries in a transaction
  const deleteAnswers = prisma.answer.deleteMany({
    where: {
      question_id: question_id,
    },
  });

  const deleteQuestion = prisma.question.delete({
    where: {
      question_id: question_id,
    },
  });

  const transaction = await prisma.$transaction([
    deleteAnswers,
    deleteQuestion,
  ]);

  res.json(question);
});

// Get Questions of a Quiz without is_correct field of Answers
// router.get('/quiz', auth, async (req, res) => {
//   const questions = await prisma.question.findMany({
//     where: {
//       quiz_id: parseInt(req.params.quiz_id),
//     },
//     orderBy: {
//       question_id: 'asc',
//     },
//     select: {
//       question_id: true,
//       content: true,
//       answers: {
//         select: {
//           answer_id: true,
//           content: true,
//         },
//       },
//     },
//   });
//   res.json(questions);
// });

module.exports = router;
