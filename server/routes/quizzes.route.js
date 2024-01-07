const express = require('express');
const _ = require('lodash');
const prisma = require('../prisma/Client');
const { validate } = require('../models/quizzes.model');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

//  /api/quizzes
// List all quizzes to authenticated users only.
router.get('/', auth, async (req, res) => {
  const quizzes = await prisma.quiz.findMany({
    orderBy: {
      title: 'asc',
    },
  });
  res.json(quizzes);
});

// Create new quiz by authenticated and admin users only.
router.post('/', auth, admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const data = _.pick(req.body, [
    'title',
    'description',
    'duration',
    'question_count',
  ]);
  const quiz = await prisma.quiz.create({
    data: {
      title: data.title,
      description: data.description,
      duration: data.duration,
      question_count: data.question_count,
    },
  });
  res.status(201).json(quiz);
});

// /api/quizzes/:quiz_id
// GET: returns details of the quiz with the given id to authenticated users only.
router.get('/:quiz_id', auth, async (req, res) => {
  const quiz = await prisma.quiz.findUnique({
    where: {
      quiz_id: parseInt(req.params.quiz_id),
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });
  if (!quiz) return res.status(404).send('Quiz not found.');
  res.json(quiz);
});

// PUT: changes details of a quiz by authenticated and admin users only.
router.put('/:quiz_id', auth, admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const data = _.pick(req.body, [
    'title',
    'description',
    'duration',
    'question_count',
  ]);
  const quiz = await prisma.quiz.update({
    where: {
      quiz_id: parseInt(req.params.quiz_id),
    },
    data: {
      title: data.title,
      description: data.description,
      duration: data.duration,
      question_count: data.question_count,
    },
  });
  if (!quiz) return res.status(404).send('Quiz not found.');
  res.json(quiz);
});

// DELETE: deletes the quiz with the given id by authenticated and admin users only.
router.delete('/:quiz_id', auth, admin, async (req, res) => {
  const quiz = await prisma.quiz.delete({
    where: {
      quiz_id: parseInt(req.params.quiz_id),
    },
  });
  if (!quiz) return res.status(404).send('Quiz not found.');
  res.json(quiz);
});

module.exports = router;
