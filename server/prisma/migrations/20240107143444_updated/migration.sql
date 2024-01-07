/*
  Warnings:

  - Added the required column `question_count` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "question_count" INTEGER NOT NULL;
