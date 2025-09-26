-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "sessionId" TEXT,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
