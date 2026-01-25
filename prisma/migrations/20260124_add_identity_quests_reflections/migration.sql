-- Manual migration for identity profile, quests, and reflections.

DO $$
BEGIN
  CREATE TYPE "QuestLevel" AS ENUM ('YEAR', 'MONTH', 'DAY');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE "QuestStatus" AS ENUM ('ACTIVE', 'DONE', 'SKIPPED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "IdentityProfile" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "identityStatement" TEXT NOT NULL,
  "visionMvp" TEXT NOT NULL,
  "antiVision" TEXT NOT NULL,
  "constraints" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "IdentityProfile_userId_key" ON "IdentityProfile"("userId");

ALTER TABLE "IdentityProfile"
  ADD CONSTRAINT "IdentityProfile_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "Quest" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "parentGoalId" INTEGER,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "level" "QuestLevel" NOT NULL,
  "dueDate" TIMESTAMP(3),
  "status" "QuestStatus" NOT NULL DEFAULT 'ACTIVE',
  "xp" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "Quest_userId_idx" ON "Quest"("userId");
CREATE INDEX IF NOT EXISTS "Quest_parentGoalId_idx" ON "Quest"("parentGoalId");

ALTER TABLE "Quest"
  ADD CONSTRAINT "Quest_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Quest"
  ADD CONSTRAINT "Quest_parentGoalId_fkey"
  FOREIGN KEY ("parentGoalId") REFERENCES "Goal"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "Reflection" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "aliveMoments" TEXT NOT NULL,
  "numbMoments" TEXT NOT NULL,
  "enemyInsight" TEXT NOT NULL,
  "nextIntent" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "Reflection_userId_idx" ON "Reflection"("userId");

ALTER TABLE "Reflection"
  ADD CONSTRAINT "Reflection_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
