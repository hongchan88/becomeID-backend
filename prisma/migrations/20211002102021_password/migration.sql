/*
  Warnings:

  - A unique constraint covering the columns `[car_plates]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_car_plates_key" ON "User"("car_plates");
