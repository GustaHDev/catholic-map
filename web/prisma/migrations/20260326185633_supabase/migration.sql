/*
  Warnings:

  - You are about to alter the column `country_code` on the `territories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Char(3)`.

*/
-- AlterTable
ALTER TABLE "territories" ALTER COLUMN "country_code" SET DATA TYPE CHAR(3);
