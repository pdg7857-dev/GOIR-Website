# GOIR Website — part of Vincere Corp

**Role:** Top of the government funnel — marketing site and the report lead magnet.

## Read the specs first

The decisions for this work live in the **`master`** repo, not here:

- `docs/00-OVERVIEW.md` — the three businesses, targets, actuals, weekly schedule
- `docs/02-GOVERNMENT.md` — this area
- `docs/04-ARCHITECTURE.md` — how the repos fit together and what owns what
- `docs/05-OPEN-QUESTIONS.md` — what is still unanswered

If `master` is checked out alongside this repo, they are at `../master/docs/`.
Otherwise: https://github.com/pdg7857-dev/master

Do not re-derive those decisions from conversation, and do not explore the other
repos to work out what they are. They are written down.

## Rules

- **Chats are disposable; the repo is the archive.** Nothing important ends its
  life in chat scrollback. Run `/wrap` to close a session — it writes what was
  decided into the specs in `master` and pushes.
- **`master` is the command layer**, not a second copy of this data. This repo
  stays the source of truth for what it owns.
- **Outbound messages are drafted, never sent automatically.**
- Cold *calling* businesses in Canada has a B2B carve-out; cold *emailing* under
  CASL is much tighter. Check before building any bulk email path.
- Data locality is unresolved — see open question 2. Keep the storage layer
  swappable.
