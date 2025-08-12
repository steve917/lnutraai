#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cp -f "$ROOT_DIR/env/api.env.example" "$ROOT_DIR/apps/api/.env" || true
cp -f "$ROOT_DIR/env/web.env.example" "$ROOT_DIR/apps/web/.env.local" || true
cp -f "$ROOT_DIR/env/marketing.env.example" "$ROOT_DIR/apps/marketing/.env.local" || true
cp -f "$ROOT_DIR/env/mobile.env.example" "$ROOT_DIR/apps/mobile/.env" || true
echo "Copied env examples into app .env files. Edit values as needed."
