import { cookies } from "next/headers";
import { createHash } from "crypto";

// Simple single-operator gate for the /leads admin. Set LEADS_PASSWORD in env.
// A signed cookie (sha256 of password + token) authorizes the session.
const COOKIE = "goir_admin";

function expectedToken() {
  const pw = process.env.LEADS_PASSWORD ?? "";
  const secret = process.env.SETUP_TOKEN ?? pw; // salt with SETUP_TOKEN when present
  return createHash("sha256").update(`${pw}:${secret}`).digest("hex");
}

export function leadsPasswordConfigured() {
  return !!process.env.LEADS_PASSWORD;
}

export function checkPassword(input: string) {
  const pw = process.env.LEADS_PASSWORD ?? "";
  return !!pw && input === pw;
}

export function isAuthed() {
  if (!leadsPasswordConfigured()) return false;
  return cookies().get(COOKIE)?.value === expectedToken();
}

export function authCookie() {
  return { name: COOKIE, value: expectedToken() };
}

export const COOKIE_NAME = COOKIE;
