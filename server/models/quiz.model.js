const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  id: Number,
  text: String,
});

const QuizSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [OptionSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
  },
  answer: {
    type: Number,
    required: true,
    ref: 'Option',
  },
});

function arrayLimit(val) {
  return val.length === 5;
}

const Quiz = mongoose.model('Quiz', QuizSchema);
