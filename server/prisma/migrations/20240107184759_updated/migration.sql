/*
  Warnings:

  - Added the required column `question_count` to the `QuizAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN     "question_count" INTEGER NOT NULL;
