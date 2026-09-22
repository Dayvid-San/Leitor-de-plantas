# Config: ports and scripts

| Script | Command | Notes |
|---|---|---|
| `npm run dev` | `next dev` | port 3000, matches `.idx/dev.nix` and `.replit` |
| `npm run build` | `next build` | static export to `/out` (`output: 'export'`) |
| `npm run start` | `next start` | not reliable for verifying a static export, see `docs-agents/tooling.md` |
| `npm run lint` | `next lint` | currently broken, ESLint isn't installed, see `docs-agents/tooling.md` |
| `npm test` | `vitest run` | single pass |
| `npx vitest` | | watch mode |
| `npx tsc --noEmit` | | project-wide typecheck, use this instead of lint for now |

`.replit` maps external port 80 to local port 3000. `.idx/dev.nix` runs `npm run dev -- --port $PORT --hostname 0.0.0.0` for its preview. Both assume `npm`.
