import APIClient from './api-client';

export type Quiz = {
  // title: Joi.string().min(3).max(50).required(),
  //   description: Joi.string(),
  //   question_count: Joi.number().integer().min(1).required(),
  //   duration: Joi.number().integer().min(1).required(),
  //   tags: Joi.array().items(Joi.string()),
  id: number;
  title: string;
  description: string;
  question_count: number;
  duration: number;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export default new APIClient<Quiz>('/quizzes');
