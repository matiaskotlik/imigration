import { Database } from '@repo/supabase/database.types';
import { createBrowserClient } from '@supabase/ssr';

import { env } from '@/env';

export const supabase = createBrowserClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
