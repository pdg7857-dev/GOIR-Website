-- Creates the IntakeSubmission table used by the website intake forms
-- (/qualify and /intake). Run this ONCE in the Supabase SQL editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).
--
-- It is purely additive: it creates one new table and two indexes and does
-- not touch any existing table, so it is safe to run against the shared
-- database. After it runs, every questionnaire submission is stored as a row
-- with one column per answer.

CREATE TABLE IF NOT EXISTS "IntakeSubmission" (
  "id"           TEXT NOT NULL,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "kind"         TEXT NOT NULL DEFAULT 'quick',
  "clientId"     TEXT,
  "companyName"  TEXT NOT NULL,
  "contactName"  TEXT,
  "email"        TEXT NOT NULL,
  "phone"        TEXT,
  "website"      TEXT,
  "based"        TEXT,
  "years"        TEXT,
  "trade"        TEXT,
  "services"     TEXT,
  "bestWork"     TEXT,
  "avoidWork"    TEXT,
  "region"       TEXT,
  "travel"       TEXT,
  "countries"    TEXT,
  "team"         TEXT,
  "concurrent"   TEXT,
  "minJob"       TEXT,
  "maxJob"       TEXT,
  "sweetSpot"    TEXT,
  "headroom"     TEXT,
  "bonding"      TEXT,
  "insurance"    TEXT,
  "certs"        TEXT,
  "setAside"     TEXT,
  "prequal"      TEXT,
  "experience"   TEXT,
  "bidsYear"     TEXT,
  "wins"         TEXT,
  "blockers"     TEXT,
  "goals"        TEXT,
  "revenueGoal"  TEXT,
  "winLooksLike" TEXT,
  "findWork"     TEXT,
  "platforms"    TEXT,
  "hours"        TEXT,
  "anythingElse" TEXT,
  "language"     TEXT,
  CONSTRAINT "IntakeSubmission_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "IntakeSubmission_email_idx" ON "IntakeSubmission"("email");
CREATE INDEX IF NOT EXISTS "IntakeSubmission_createdAt_idx" ON "IntakeSubmission"("createdAt");
