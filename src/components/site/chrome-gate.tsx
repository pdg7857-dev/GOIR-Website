"use client";

import { usePathname } from "next/navigation";

/**
 * Campaign landing pages carry no site navigation: one page, one goal, no exits
 * other than the call to action. Wrapping the header and footer in this gate
 * keeps the root layout unchanged for every other route.
 */
const BARE_PREFIXES = ["/watch"];

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const bare = BARE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  return bare ? null : <>{children}</>;
}
