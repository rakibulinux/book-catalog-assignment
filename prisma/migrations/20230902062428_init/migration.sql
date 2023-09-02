/*
  Warnings:

  - You are about to drop the column `profileImage` on the `users` table. All the data in the column will be lost.
  - Added the required column `profileImg` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "profileImage",
ADD COLUMN     "profileImg" TEXT NOT NULL;
