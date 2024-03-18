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
  attempt_id?: string;
  quiz_id?: string;
  user_id?: string;
  userAnswers?: UserAnswer[];
  created_at?: string;
  updated_at?: string;
  question_count?: number;
  score?: number | null;
  quiz?: Quiz;
};

export type UserAnswer = {
  user_answer_id?: string;
  attempt_id?: string;
  question_id?: string;
  answer_id?: string;
  created_at?: string;
  answer?: Answer;
  question?: Question;
};

export type Question = {
  // content: Joi.string().min(3).max(1000).required(),
  //   answers: Joi.array()
  //     .items(
  //       Joi.object({
  //         content: Joi.string().min(1).max(500).required(),
  //         is_correct: Joi.boolean().required(),
  //       })
  //     )
  question_id: string;
  content: string;
  answers: Answer[];
  created_at?: string;
  updated_at?: string;
  quiz_id?: string;
};

export type Answer = {
  answer_id: string;
  content: string;
  is_correct?: boolean;
  question_id?: string;
  created_at?: string;
  updated_at?: string;
};

export type Quiz = {
  // title: Joi.string().min(3).max(50).required(),
  //   description: Joi.string(),
  //   question_count: Joi.number().integer().min(1).required(),
  //   duration: Joi.number().integer().min(1).required(),
  //   tags: Joi.array().items(Joi.string()),
  quiz_id: string;
  title: string;
  description: string;
  question_count: number;
  duration: number;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type UserType = {
  user_id?: string;
  name?: string;
  email: string;
  role?: 'ADMIN' | 'USER';
  password?: string;
  created_at?: string;
  updated_at?: string;
  token?: string;
};

export type AttemptType = {
  attempt: Attempt;
  shuffledQuestions: Question[];
};

export type UserAttemptsType = Attempt & { quiz?: Quiz };