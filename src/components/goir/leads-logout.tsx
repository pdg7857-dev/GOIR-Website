"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/leads/logout", { method: "POST" });
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="inline-flex items-center gap-1.5 rounded-lg bg-bg-raised px-3 py-2 text-xs font-medium text-fg-muted ring-1 ring-border hover:bg-bg-hover hover:text-fg"
    >
      <LogOut className="h-3.5 w-3.5" /> Sign out
    </button>
  );
}
