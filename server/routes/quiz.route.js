const express = require('express');
const Quiz = require('../models/quiz.model');

const router = express.Router();

router.get('/:topic', async (req, res) => {
  const topic = req.params.topic;
  const questions = await Quiz.find({ topic: topic });
  res.send(questions);
});

router.get('/:topic/:id', async (req, res) => {
  const topic = req.params.topic;
  const id = req.params.id;
  const question = await Quiz.find({ topic: topic, _id: id });
  if (!question) return res.status(404).send('Question not found.');
  res.send(question);
});

router.post('/:topic', async (req, res) => {
  const topic = req.params.topic;
  if (error) return res.status(400).send(error.details[0].message);
  const question = new Quiz({
    topic: topic,
    question: req.body.question,
    options: req.body.options,
    answer: req.body.answer,
  });
  await question.save();
  res.send(question);
});

router.put('/:topic/:id', async (req, res) => {
  const topic = req.params.topic;
  const id = req.params.id;
  if (error) return res.status(400).send(error.details[0].message);
  const question = await Quiz.findOneAndUpdate(
    { topic: topic, _id: id },
    {
      $set: {
        question: req.body.question,
        options: req.body.options,
        answer: req.body.answer,
      },
    },
    { new: true }
  );
  res.send(question);
});

router.delete('/:topic/:id', async (req, res) => {
  const topic = req.params.topic;
  const id = req.params.id;
  const question = Quiz.findOneAndDelete({ topic: topic, _id: id });
  if (!question) return res.status(404).send('Question not found.');
  res.send(question);
});
