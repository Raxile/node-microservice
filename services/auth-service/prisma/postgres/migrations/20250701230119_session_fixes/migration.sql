-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "refreshTokenHash" DROP NOT NULL,
ALTER COLUMN "expiresAt" DROP NOT NULL;
