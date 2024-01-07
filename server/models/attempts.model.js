const Joi = require('joi');

function startAttempt(attempt) {
  const schema = Joi.object({
    quiz_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
  });
  return schema.validate(attempt);
}

function submitAttempt(attempt) {
  const schema = Joi.object({
    answers: Joi.array()
      .items(
        Joi.object({
          attempt_id: Joi.number().integer().required(),
          question_id: Joi.number().integer().required(),
          answer_id: Joi.number().integer().required(),
        })
      )
      .required(),
  });
  return schema.validate(attempt);
}

module.exports = {
  startAttempt,
  submitAttempt,
};
