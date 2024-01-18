import APIClient from './api-client';

export type Question = {
  // content: Joi.string().min(3).max(1000).required(),
  //   answers: Joi.array()
  //     .items(
  //       Joi.object({
  //         content: Joi.string().min(1).max(500).required(),
  //         is_correct: Joi.boolean().required(),
  //       })
  //     )

  id: number;
  content: string;
  answers: Answer[];
};

export type Answer = {
  id: number;
  content: string;
  is_correct: boolean;
};

export default new APIClient<Question>('/quizzes/:quizId/questions');
