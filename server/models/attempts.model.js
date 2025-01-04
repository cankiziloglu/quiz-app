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

function shuffleQuestions(questions, questionCount) {
  
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  // Shuffle answers for each question
  questions.forEach(question => {
    if (question.answers && Array.isArray(question.answers)) {
      for (let i = question.answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question.answers[i], question.answers[j]] = [question.answers[j], question.answers[i]];
      }
    }
  });

  questions = questions.slice(0, questionCount);
  return questions;
}

module.exports = {
  startAttempt,
  submitAttempt,
  shuffleQuestions,
};
