import APIClient from './api-client';

export type Attempt = {
  // quiz_id: Joi.number().integer().required(),
  // user_id: Joi.number().integer().required(),
  // answers: Joi.array()
  //     .items(
  //       Joi.object({
  //         attempt_id: Joi.number().integer().required(),
  //         question_id: Joi.number().integer().required(),
  //         answer_id: Joi.number().integer().required(),
  //       })
  //     )

  id: number;
  quiz_id: number;
  user_id: number;
  answers: UserAnswer[];
  created_at: string;
  updated_at: string;
  question_count: number;
  score: number;
};

export type UserAnswer = {
  id: number;
  attempt_id: number;
  question_id: number;
  answer_id: number;
  created_at: string;
};

export default new APIClient<Attempt>('/attempt');
