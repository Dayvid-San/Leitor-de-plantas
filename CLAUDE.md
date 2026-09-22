# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start Next.js dev server (port 3000; .idx/.replit configs also assume npm + port 3000)
npm run build    # production build (uses next.config.js, static export, see below)
npm run start    # serve the production build
npm run lint     # next lint
npm test         # vitest run, runs __tests__/**
npx vitest       # watch mode
```

- Both `package-lock.json` and `pnpm-lock.yaml` are committed, but `.idx/dev.nix` and `.replit` both invoke `npm`, so treat npm as the canonical package manager here.
- Tests run on Vitest (`vitest.config.mts`, jsdom environment, `globals: true`, `@` aliased to the repo root to match `tsconfig.json`) plus `@testing-library/react` for hook/context tests (`renderHook`/`act`/`waitFor`, no extra setup file needed: its auto-cleanup picks up the global `afterEach` that `globals: true` provides). Tests that touch `requestAnimationFrame`/`setTimeout` should use `vi.useFakeTimers()` + `vi.advanceTimersByTimeAsync(...)` rather than real waits, since jsdom's `requestAnimationFrame` polyfill can take up to ~40ms to fire, and a dangling un-awaited animation whose timers fire after the test ends will throw when it tries to touch a `document.body` the next test's `beforeEach` has already replaced. Existing tests: `lib/utils.test.ts`, `hooks/use-toast.test.ts`, `hooks/use-mobile.test.ts`, `components/audio-provider.test.tsx`, `components/door-transition-provider.test.tsx` (mocks `next/navigation` and `@/components/audio-provider` via `vi.mock`), `__tests__/animation-utils.test.tsx`.

## Architecture

**Static export, not a server app.** Two Next config files exist (`next.config.js` and `next.config.mjs`) with different settings. Next.js resolves config files in the fixed order `next.config.js` → `.mjs` → `.ts` and uses the first match, so **`next.config.js` is the one actually in effect** (`output: 'export'`, `trailingSlash: true`, `reactStrictMode: false`). `next.config.mjs` (which sets `eslint.ignoreDuringBuilds` / `typescript.ignoreBuildErrors`) is dead config. Because the site builds as a static export, there is no Next.js server runtime: no API routes, no server actions, no middleware. The site does have a real backend, just an external one: `../visit-card-backend` (Spring Boot, separate repo/process/deploy), called via plain client-side `fetch` through `lib/api.ts`. See `docs-agents/backend.md`.

**Layout/provider chain** (outer to inner): `app/layout.tsx` (root `<html className="dark">`, Geist fonts, wraps everything in `VoiceProvider` + `Suspense` + `Analytics`) → `components/client-layout.tsx` (client component; renders `null` until `mounted` to avoid hydration mismatch) → `ThemeProvider` → `AudioProvider` → `DoorTransitionProvider` → `Header` / page content / `Footer`.

**"Door transition" navigation** is the site's signature effect. `components/door-transition-provider.tsx` exposes `navigateWithDoor(href, isExternal)`, called by `Header`/`Footer` links instead of using `<Link>` directly: it calls `animateDoor` (from `lib/animation-utils.ts`) to animate the `[data-door-footer]` element (translateY) to look like a door closing, fires `playDoorSound()` from `AudioProvider` partway through, then calls `router.push`/`window.open`, then reopens the door. It respects `prefers-reduced-motion` (falls back to a plain crossfade + navigate). `animateDoor` itself is the single source of truth for the animation and is covered by `__tests__/animation-utils.test.tsx`.

**Backend integration** (`lib/api.ts`) talks to `visit-card-backend` (JWT auth + REST CRUD + SMTP contact form + local-disk image upload), configured from `NEXT_PUBLIC_API_URL`. It backs three things:
- `app/admin/page.tsx` + `app/admin/dashboard/page.tsx`: JWT login (`isAuthenticated()` checked once on mount, no live listener, redirects to `/admin` if there's no token) gating a full CRUD UI for the `programmer` / `research` project categories: list, create, edit and delete, with the image field populated either by pasting a URL or uploading a file (`POST /api/upload/{category}`) and storing the resulting URL. Both paths write the same `image: string` field, so `app/portfolio/page.tsx` doesn't need to know which one was used.
- `app/portfolio/page.tsx`: reads those same two categories and renders them as the public portfolio.
- `app/contato/page.tsx`: a real contact form (`POST /api/contact`), rate-limited per IP by the backend and relayed by email over SMTP.

Firebase (`lib/firebase.ts`, the `firebase` npm package) was removed when this backend replaced it; see `docs-agents/backend.md`.

**Content/route structure**: `app/{programador,empreendedor,universitario,portfolio,contato,atenas}/page.tsx` are the top-level personal-site sections (see `navLinks` in `components/header.tsx`); `app/portfolio/{constructor,engscan,flugo,tyto}/page.tsx` are individual project detail pages linked from the portfolio index.

**Voice announcements**: `components/VoiceProvider.tsx` + `hooks/useVoiceAnnouncement.ts` speak a per-route string via the Web Speech API on navigation. All entries in `routeAnnouncements` are currently commented out, so this is presently a no-op scaffold; re-enabling it means uncommenting/adding strings there.

**UI kit**: `components/ui/*` is shadcn/ui (`components.json`: `new-york` style, neutral base color, icon library `lucide`). Path aliases (`@/components`, `@/lib`, `@/hooks`, `@/ui`) are defined in `components.json` and backed by the `@/*` → `./*` mapping in `tsconfig.json`.

**Two `globals.css` files exist**: `app/globals.css` is the one actually imported (by `app/layout.tsx`) and contains the door-transition CSS custom properties and a `fantasy-shell` utilities layer; `styles/globals.css` is an older, unreferenced copy; treat it as stale rather than a second source of truth.

## Claude harness

This repo has a `.claude/` harness (skills, slash commands, hooks, permissions) plus a `docs-agents/` directory of topic-scoped context files. `docs-agents/` files are deliberately **not** inlined here, read only the one(s) relevant to the current task (see `docs-agents/README.md` for which is which), instead of loading all of them into every session:

- [`docs-agents/architecture.md`](docs-agents/architecture.md) — static export, door transition, dead config files, route structure
- [`docs-agents/testing.md`](docs-agents/testing.md) — Vitest conventions, fake timers for animation code
- [`docs-agents/tooling.md`](docs-agents/tooling.md) — npm vs pnpm, and why `npm run lint` is currently broken
- [`docs-agents/backend.md`](docs-agents/backend.md) — `lib/api.ts`, JWT auth, project CRUD, image upload, contact form
- [`docs-agents/writing-style.md`](docs-agents/writing-style.md) — commit/comment style (no em dash, minimal comments)
- [`docs-agents/env.md`](docs-agents/env.md) — required env vars and what reads them
- [`docs-agents/ports-and-scripts.md`](docs-agents/ports-and-scripts.md) — every npm script, one line each

**Skills** (`.claude/skills/`): `dev-loop` (typecheck + test + build, fix until green) and `architecture-guard` (checks new routes/nav links against the static-export and door-transition constraints). Both are auto-discovered, Claude reaches for them when the task matches their description, they don't need to be invoked by name.

**Commands** (`.claude/commands/`): `/dev-loop` runs the dev-loop skill on demand; `/ship-check` runs it plus a pre-commit review gate. See `.claude/loops/README.md` for how to run either continuously with the built-in `/loop` skill.

**Automation** (`.claude/settings.json`): a `PostToolUse` hook typechecks the project after every `Edit`/`Write` to a `.ts`/`.tsx` file and blocks with the TypeScript errors if it fails, plus a pre-approved allow-list for this repo's own build/test/git commands so the loop above doesn't stall on permission prompts.
