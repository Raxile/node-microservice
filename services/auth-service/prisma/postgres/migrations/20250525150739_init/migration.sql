CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE "User" (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    password TEXT NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT now(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "User_pkey" PRIMARY KEY (id)
);

CREATE UNIQUE INDEX "User_email_key" ON "User"(email);

-- Trigger to auto-update updatedAt on row update
CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updatedAt = now();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_updatedAt
BEFORE UPDATE ON "User"
FOR EACH ROW EXECUTE FUNCTION update_updatedAt_column();
