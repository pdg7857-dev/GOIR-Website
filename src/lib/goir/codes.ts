// Human-friendly access code, e.g. "GOIR-7K4M2Q". No ambiguous chars (0/O/1/I).
import { randomInt } from "crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateAccessCode(): string {
  let body = "";
  for (let i = 0; i < 6; i++) body += ALPHABET[randomInt(ALPHABET.length)];
  return `GOIR-${body}`;
}
