# Government Opportunity Intelligence — public site

The public-facing site: a marketing/SEO site **plus** the interactive
Government Opportunity Intelligence Report™ (GOIR) lead magnet, in one Next.js
app, deployed as its own Vercel project. It shares the Kingsway OS database, so
every report and consultation request flows into the OS eProcurement pipeline
(visible in the OS at `/goir-leads`).

| Area | Routes |
|------|--------|
| Marketing / SEO | `/` plus ~177 service, platform, industry, renewal, blog and pricing pages |
| Report (lead magnet) | `/report` (intake form), `/report/[id]?code=…` (the report, unlocked by access code), `/access` (enter a code) |
| Operator dashboard | `/leads` — password-protected list of all requests, their access codes and statuses (set `LEADS_PASSWORD`) |
| API | `POST /api/goir` (score + persist + receipt email), `POST /api/goir/[id]/consult` (capture a CRM lead), `GET /api/setup` (provision the table + demo report), `POST /api/leads/login` |

This single deployment serves everything: marketing, the report, and the leads
dashboard. (Kingsway OS also keeps a `/goir-leads` view for when it's deployed,
but it isn't required — `/leads` here is self-contained.)

The report is a dark "tool" surface inside the light marketing header/footer.
The scoring engine and report UI live in `src/lib/goir` and `src/components/goir`;
see [`../docs/GOIR.md`](../docs/GOIR.md) for the engine design.

## Deploy as a Vercel project

1. Vercel → **New Project → import this repo** → set **Root Directory** to `website`.
2. Framework: **Next.js** (auto-detected). Build is `prisma generate && next build`.
3. Environment variables (see `.env.example`):
   - `DATABASE_URL` / `DIRECT_URL` — **the same values as the Kingsway OS project**.
   - `NEXT_PUBLIC_SITE_URL` — this site's public URL (used in report emails).
   - `ANTHROPIC_API_KEY` — optional (AI narrative layer).
   - `RESEND_API_KEY` + `EMAIL_FROM` — optional (emails the report link).
4. Deploy. The `GoirReport` table is created by the Kingsway OS `/api/setup`
   endpoint — this app only reads/writes it and never runs migrations.

In the Kingsway OS project, set `NEXT_PUBLIC_GOIR_URL` to this site's URL so the
in-app GOIR Leads view links to `<url>/report/<id>`.

## Local dev

```bash
cd website
npm install
cp .env.example .env   # point DATABASE_URL at your dev DB
npm run dev            # http://localhost:3000
```

Brand, navigation, pricing and contact details live in `src/lib/site/config.ts`.
