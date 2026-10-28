#!/usr/bin/env bash
set -euo pipefail
PREVIEW_SITE="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd -- "$PREVIEW_SITE"
export QUARTZ_LOCAL_PREVIEW=1
npm run install-plugins
node publishing/publish.mjs check --source content --site . --output public
exec python3 publishing/preview.py --port "${1:-8885}"
