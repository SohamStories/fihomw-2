/*
  Warnings:

  - You are about to drop the `accountype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accountype" DROP CONSTRAINT "accountype_userId_fkey";

-- DropTable
DROP TABLE "accountype";

-- CreateTable
CREATE TABLE "accountypes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "accountypes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accountypes" ADD CONSTRAINT "accountypes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
