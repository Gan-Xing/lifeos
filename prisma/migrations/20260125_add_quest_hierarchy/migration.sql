-- Manual migration to add quest hierarchy (YEAR -> MONTH -> DAY).

ALTER TABLE "Quest"
  ADD COLUMN IF NOT EXISTS "parentQuestId" INTEGER;

CREATE INDEX IF NOT EXISTS "Quest_parentQuestId_idx" ON "Quest"("parentQuestId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'Quest_parentQuestId_fkey'
  ) THEN
    ALTER TABLE "Quest"
      ADD CONSTRAINT "Quest_parentQuestId_fkey"
      FOREIGN KEY ("parentQuestId") REFERENCES "Quest"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
