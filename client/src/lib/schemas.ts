import { z } from 'zod';

export const editAccountSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Must be at least 2 characters long' })
      .optional(),
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    password: z
      .string()
      .min(8, { message: 'Must be at least 8 characters long' })
      .max(20, { message: 'Must be max 20 characters long' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          'Must contain at least one uppercase, one lowercase, and one numerical character',
      })
      .optional(),
    cpassword: z.string().optional(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: 'Passwords do not match',
    path: ['password'],
  });

export const quizSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Must be at least 3 characters long' })
    .max(50),
  description: z.string().optional(),
  question_count: z.coerce.number().int().min(1),
  duration: z.coerce.number().int().min(1),
  tags: z.string().array().optional(),
});

export const questionSchema = z
  .object({
    content: z.string().min(3).max(1000),
    answers: z
      .array(
        z.object({
          content: z.string().min(1).max(500),
          is_correct: z.boolean(),
        })
      )
      .length(4),
  })
  .superRefine((question, ctx) => {
    const correctAnswers = question.answers.filter(
      (answer) => answer.is_correct
    );
    if (correctAnswers.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'There must be exactly 1 correct answer',
        path: ['content'],
      });
    }
  });
