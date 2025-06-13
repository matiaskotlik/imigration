#!/usr/bin/env -S bash -euo pipefail

trap 'mv supabase/migrations.bak supabase/migrations' EXIT
mv supabase/migrations supabase/migrations.bak
supabase db reset --no-seed
