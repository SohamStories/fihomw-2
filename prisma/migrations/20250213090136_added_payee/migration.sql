/*
  Warnings:

  - You are about to drop the column `type` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `payee` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "type",
ADD COLUMN     "payee" TEXT NOT NULL;
