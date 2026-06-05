import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";
import { GOIR_SQL } from "@/lib/goirSql";
import { prisma } from "@/lib/prisma";
import { runGoir } from "@/lib/goir/engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// A fixed, shareable demo report you can use to test the access-code flow.
const DEMO_CODE = "GOIR-DEMO24";

/**
 * One-shot, token-gated setup for the public site:
 *   1) ensures the GoirReport table exists on the shared database;
 *   2) seeds a demo report unlocked by the code GOIR-DEMO24.
 * Idempotent, safe to run repeatedly.
 *
 *   GET/POST /api/setup?token=<SETUP_TOKEN>
 *
 * Uses DIRECT_URL (bypasses pgbouncer for DDL) when available.
 */
async function handle(req: NextRequest) {
  const url = new URL(req.url);
  const provided = url.searchParams.get("token") ?? req.headers.get("x-setup-token");
  const expected = process.env.SETUP_TOKEN;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "SETUP_TOKEN env var not set on the server." }, { status: 500 });
  }
  if (provided !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid token." }, { status: 401 });
  }
  const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!connectionString) {
    return NextResponse.json({ ok: false, error: "DIRECT_URL / DATABASE_URL is missing." }, { status: 500 });
  }

  // 1) Ensure the table exists.
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    await client.query(GOIR_SQL); // pg supports multi-statement simple queries
  } catch (e: any) {
    await client.end().catch(() => {});
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  } finally {
    await client.end().catch(() => {});
  }

  // 2) Seed the demo report (idempotent on the fixed access code).
  let demo = "skipped";
  try {
    const existing = await prisma.goirReport.findUnique({ where: { accessCode: DEMO_CODE }, select: { id: true } });
    if (!existing) {
      const input = {
        companyName: "Meridian Construction Group (Sample)",
        website: "meridianbuild.ca",
        industry: "construction",
        region: "ON",
        email: "sample@example.com",
        platformsUsed: ["merx"],
        annualBidVolume: 240,
        employees: 55,
      };
      const result = runGoir(input);
      await prisma.goirReport.create({
        data: {
          companyName: input.companyName,
          website: input.website,
          industry: input.industry,
          region: input.region,
          email: input.email,
          contactName: "Sample Prospect",
          platformsUsed: input.platformsUsed,
          annualBidVolume: input.annualBidVolume,
          employees: input.employees,
          index: result.index,
          tier: result.tier,
          scores: result.categories.reduce<Record<string, number>>((m, c) => ((m[c.key] = c.score), m), {}),
          result: result as unknown as object,
          accessCode: DEMO_CODE,
          status: "DELIVERED",
          deliveredAt: new Date(),
          source: "demo",
        },
      });
      demo = "created";
    } else {
      demo = "already present";
    }
  } catch (e: any) {
    demo = `error: ${String(e?.message ?? e)}`;
  }

  return NextResponse.json({
    ok: true,
    detail: "GoirReport table ensured.",
    demo,
    demoCode: DEMO_CODE,
    tryIt: `/access?code=${DEMO_CODE}`,
  });
}

export async function GET(req: NextRequest) { return handle(req); }
export async function POST(req: NextRequest) { return handle(req); }
