import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod/v4';

export const env = createEnv({
  client: {
    EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().nonempty(),
    EXPO_PUBLIC_SUPABASE_URL: z.url(),
    EXPO_PUBLIC_TRPC_URL: z.url(),
  },
  clientPrefix: 'EXPO_PUBLIC_',
  extends: [],
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnvStrict: {
    EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    EXPO_PUBLIC_TRPC_URL: process.env.EXPO_PUBLIC_TRPC_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  server: {},
  shared: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
  },
  skipValidation: ['build:check', 'lint', 'lint:check'].includes(
    process.env.npm_lifecycle_event ?? ''
  ),
});
