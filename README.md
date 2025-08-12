# L-Nutra AI — Monorepo Scaffold (Staging)

Apps:
- `apps/api` — FastAPI + SQLAlchemy + Alembic
- `apps/web` — Next.js (user app)
- `apps/marketing` — Next.js (password-gated, no-index)
- `apps/mobile` — Expo (light)

## Local quickstart
```bash
pnpm install
python -m venv .venv && source .venv/bin/activate
pip install -r apps/api/requirements.txt
docker compose -f infra/docker-compose.yml up -d
(cd apps/api && alembic upgrade head)
bash scripts/copy_env.sh
pnpm dev:api
pnpm dev:web
pnpm dev:marketing
pnpm dev:mobile
```
