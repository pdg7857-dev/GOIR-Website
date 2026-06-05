// Idempotent SQL to provision just the GoirReport table on the shared database.
// The public site never runs full migrations, this only ensures its own table
// exists. Safe to run repeatedly.
export const GOIR_SQL = `
CREATE TABLE IF NOT EXISTS "GoirReport" (
  "id" TEXT NOT NULL,
  "companyName" TEXT NOT NULL,
  "website" TEXT,
  "industry" TEXT NOT NULL,
  "region" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "contactName" TEXT,
  "phone" TEXT,
  "platformsUsed" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "annualBidVolume" INTEGER,
  "employees" INTEGER,
  "index" INTEGER NOT NULL,
  "tier" TEXT NOT NULL,
  "scores" JSONB NOT NULL,
  "result" JSONB NOT NULL,
  "narrative" JSONB,
  "accessCode" TEXT,
  "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
  "deliveredAt" TIMESTAMP(3),
  "firstViewedAt" TIMESTAMP(3),
  "consultationRequested" BOOLEAN NOT NULL DEFAULT false,
  "consultRequestedAt" TIMESTAMP(3),
  "convertedClientId" TEXT,
  "source" TEXT NOT NULL DEFAULT 'web',
  "ipHash" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GoirReport_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "GoirReport" ADD COLUMN IF NOT EXISTS "contactName" TEXT;
ALTER TABLE "GoirReport" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "GoirReport" ADD COLUMN IF NOT EXISTS "accessCode" TEXT;
ALTER TABLE "GoirReport" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'SUBMITTED';
ALTER TABLE "GoirReport" ADD COLUMN IF NOT EXISTS "deliveredAt" TIMESTAMP(3);
ALTER TABLE "GoirReport" ADD COLUMN IF NOT EXISTS "firstViewedAt" TIMESTAMP(3);
CREATE UNIQUE INDEX IF NOT EXISTS "GoirReport_accessCode_key" ON "GoirReport"("accessCode");
CREATE INDEX IF NOT EXISTS "GoirReport_industry_createdAt_idx" ON "GoirReport"("industry", "createdAt");
CREATE INDEX IF NOT EXISTS "GoirReport_status_createdAt_idx" ON "GoirReport"("status", "createdAt");
CREATE INDEX IF NOT EXISTS "GoirReport_email_idx" ON "GoirReport"("email");
`;
