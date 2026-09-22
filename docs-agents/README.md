# Contexts for agents

Each file here is a self-contained context on one topic. `CLAUDE.md` at the repo root only links to these, it does not inline them, so a coding session only reads the file(s) actually relevant to the task at hand instead of loading every topic every time.

| File | Read this when |
|---|---|
| `architecture.md` | touching routing, navigation, `next.config.*`, or anything that looks like it needs a backend |
| `testing.md` | writing or fixing a Vitest test, especially anything touching timers/animation |
| `tooling.md` | running lint/build/dev scripts, or anything package-manager related |
| `backend.md` | touching `lib/api.ts`, `app/admin/*`, `app/portfolio/page.tsx`, `app/contato/page.tsx`, or anything else that talks to `visit-card-backend` |
| `writing-style.md` | writing a commit message, PR description, or code comment |
| `env.md` | adding/changing an env var, or setting up `.env.local` |
| `ports-and-scripts.md` | quick reference for every npm script, what it does, and what's currently broken |

Don't read all seven before starting a task, pick the ones the task actually touches.
