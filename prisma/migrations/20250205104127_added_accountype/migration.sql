-- CreateTable
CREATE TABLE "accountype" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "accountype_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accountype" ADD CONSTRAINT "accountype_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
