# Rule: Architecture guardrails

- This project builds as a **static export** (`output: 'export'` in `next.config.js`, the config file actually in effect since Next resolves `.js` before `.mjs`). Never add `app/api/*`, server actions, or middleware: none of them run in the built site.
- The site does have a real backend, just not a Next.js one: `../visit-card-backend` (Spring Boot, separate process/deploy) is called via plain client-side `fetch` through `lib/api.ts`. That's fine under static export because it's an external origin (`NEXT_PUBLIC_API_URL`), not a route inside this app. See `backend.md`.
- Navigation links inside `Header` and `Footer` must go through `navigateWithDoor(href, isExternal)` from `components/door-transition-provider.tsx`, not a plain `<Link>` or `router.push`. That is what drives the door-closing animation, the sound cue, and the `prefers-reduced-motion` fallback. New nav entries belong in `navLinks` in `components/header.tsx`.
- `next.config.mjs` is dead config (shadowed by `next.config.js`). If a build setting needs to change, edit `next.config.js`; editing `.mjs` has no effect.
- `styles/globals.css` is a stale, unreferenced copy. The live stylesheet is `app/globals.css` (imported from `app/layout.tsx`). Never edit `styles/globals.css` expecting it to affect the site.
- New top-level sections follow `app/<section>/page.tsx`, added to `navLinks`; new portfolio project detail pages follow `app/portfolio/<project>/page.tsx`, matching the existing ones (`constructor`, `engscan`, `flugo`, `tyto`).
