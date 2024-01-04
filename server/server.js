const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const quiz = require('./routes/quiz.route');
const users = require('./routes/user.route');
const results = require('./routes/result.route');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api/quiz', quiz);
app.use('/api/user', users);
app.use('/api/result', results);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
