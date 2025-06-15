#!/usr/bin/env -S bash -euo pipefail

cat schemas/*.sql | psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" -q -v ON_ERROR_STOP=1
