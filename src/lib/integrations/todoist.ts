// Todoist adapter, gated behind env vars like the email integration.
//
//   TODOIST_API_TOKEN        , personal API token (Todoist > Settings > Integrations > Developer)
//   TODOIST_LEADS_PROJECT_ID , project the lead tasks land in. Optional: without
//                              it tasks go to the Inbox, which still notifies.
//
// When unconfigured, createLeadTask() is a graceful no-op so a missing token can
// never take the form down. A lead is never lost to this call failing: the route
// already writes the CRM, emails, and logs the full lead regardless.
//
// Note on priority: the REST API is inverted relative to the UI. 4 is urgent
// (what the app shows as p1), 1 is lowest. This sends 4 on purpose.

export function todoistConfigured() {
  return !!process.env.TODOIST_API_TOKEN;
}

export async function createLeadTask(opts: {
  /** Task title. Kept short: the who and the what. */
  content: string;
  /** Everything else, so the task is workable without opening email. */
  description: string;
  /** Defaults to today so it shows up in Today rather than someday. */
  dueString?: string;
  labels?: string[];
}): Promise<{ ok: boolean; skipped?: boolean; id?: string; error?: string }> {
  if (!todoistConfigured()) return { ok: false, skipped: true };
  try {
    const res = await fetch("https://api.todoist.com/rest/v2/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TODOIST_API_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content: opts.content,
        description: opts.description,
        due_string: opts.dueString ?? "today",
        priority: 4,
        labels: opts.labels ?? ["lead"],
        ...(process.env.TODOIST_LEADS_PROJECT_ID
          ? { project_id: process.env.TODOIST_LEADS_PROJECT_ID }
          : {}),
      }),
      // A slow Todoist must not hold the visitor's form submission open.
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, error: `Todoist ${res.status}: ${detail.slice(0, 200)}` };
    }
    const json = (await res.json().catch(() => null)) as { id?: string } | null;
    return { ok: true, id: json?.id };
  } catch (e: any) {
    return { ok: false, error: String(e?.message ?? e) };
  }
}
