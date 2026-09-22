# Config: environment variables

The only required var is `NEXT_PUBLIC_API_URL` (client-side, embedded at build time), read by `lib/api.ts`. It lives in `.env.local` (gitignored); template is `.env.example` at the repo root, copy it to `.env.local`.

| Variable | Used by | Default (when unset) |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `lib/api.ts`, base URL for every backend call | `http://localhost:8080` |

Point it at wherever `visit-card-backend` is actually running: `http://localhost:8080` for local dev against a locally-run backend, or its deployed URL otherwise. See `visit-card-backend/README.md` for that project's own env vars (JWT secret, mail credentials, etc.), none of which belong in this repo.

Not secret in the "server secret" sense (it's just a URL baked into the client bundle either way), but keep it in `.env.local` rather than hardcoded, that is what `.env.local` and `.gitignore` are for.
