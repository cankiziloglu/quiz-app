import { AttemptType } from "@/context/quiz-context";
import APIClient from "./api-client";

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
  answers?: UserAnswer[];
  created_at?: string;
  updated_at?: string;
  question_count?: number;
  score?: number | null;
};

export type UserAnswer = {
  user_answer_id?: string;
  attempt_id?: string;
  question_id?: string;
  answer_id?: string;
  created_at?: string;
};

export default new APIClient<Attempt | AttemptType>("/attempt");