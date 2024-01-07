const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
require('express-async-errors');
const error = require('./middleware/error');
const quizzes = require('./routes/quizzes.route');
const users = require('./routes/users.route');
const attempts = require('./routes/attempts.route');
const questions = require('./routes/questions.route');

const app = express();

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api/quizzes', quizzes);
app.use('/api/users', users);
app.use('/api/attempt', attempts);
app.use('/api/quizzes/:quiz_id/questions', questions);
app.use(error);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

module.exports = app;
