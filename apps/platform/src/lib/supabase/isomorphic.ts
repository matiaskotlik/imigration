import { Database } from '@repo/supabase/database.types';
import { createClient } from '@supabase/supabase-js';

import { env } from '@/env';

// isometric supabase client using supabase-js rather than supabase-ssr
// don't use for auth! only queries
export const isomorphicSupabase = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
