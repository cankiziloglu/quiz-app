const Joi = require('joi');

function validateQuestion(question) {
  const schema = Joi.array().items(
    Joi.object({
      content: Joi.string().min(3).max(1000).required(),
      answers: Joi.array()
        .items(
          Joi.object({
            content: Joi.string().min(1).max(500).required(),
            is_correct: Joi.boolean().required(),
          })
        )
        .length(4)
        .required()
        .custom((value, helper) => {
          const correctAnswers = value.filter((answer) => answer.is_correct);
          if (correctAnswers.length !== 1) {
            return helper.message('There must be exactly 1 correct answer');
          }
          return value;
        }, 'Answers Validation'),
    })
  );
  return schema.validate(question);
}

exports.validate = validateQuestion;
