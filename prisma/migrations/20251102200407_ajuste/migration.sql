/*
  Warnings:

  - You are about to alter the column `likes` on the `Twitte` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `replies` on the `Twitte` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Twitte" ALTER COLUMN "likes" SET DATA TYPE INTEGER,
ALTER COLUMN "replies" SET DATA TYPE INTEGER;
