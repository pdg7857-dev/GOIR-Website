import { NextResponse } from "next/server";
import { emailConfigured } from "@/lib/integrations/email";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Read-only config health check. Reports whether the email and database
 * integrations are wired, with no secrets in the output, so submission
 * delivery can be diagnosed without inbox or database access.
 */
export async function GET() {
  let dbConnects = false;
  let intakeTable = false;
  let intakeCount: number | null = null;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbConnects = true;
    try {
      intakeCount = await prisma.intakeSubmission.count();
      intakeTable = true;
    } catch {
      intakeTable = false;
    }
  } catch {
    dbConnects = false;
  }

  return NextResponse.json({
    email: emailConfigured(),
    resendKeySet: !!process.env.RESEND_API_KEY,
    emailFromSet: !!process.env.EMAIL_FROM,
    databaseUrlSet: !!process.env.DATABASE_URL,
    dbConnects,
    intakeTable,
    intakeCount,
  });
}
