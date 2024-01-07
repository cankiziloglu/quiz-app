const Joi = require('joi');

function validateQuiz(quiz) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string(),
    question_count: Joi.number().integer().min(1).required(),
    duration: Joi.number().integer().min(1).required(),
  });
  return schema.validate(quiz);
}

exports.validate = validateQuiz;
