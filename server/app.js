const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
require('express-async-errors');
const logger = require('./middleware/logger');
const quiz = require('./routes/quizzes.route');
const users = require('./routes/users.route');
const results = require('./routes/attempts.route');
const questions = require('./routes/questions.route');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api/quizzes', quizzes);
app.use('/api/users', users);
app.use('/api/attempts', attempts);
app.use('/api/questions', questions);
app.use(logger);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

module.exports = app;
