import { NextRequest, NextResponse } from "next/server";
import { checkPassword, authCookie, leadsPasswordConfigured } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!leadsPasswordConfigured()) {
    return NextResponse.json({ ok: false, error: "LEADS_PASSWORD is not set on the server." }, { status: 500 });
  }
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* ignore */
  }
  if (!checkPassword(String(body?.password ?? ""))) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  const { name, value } = authCookie();
  res.cookies.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
