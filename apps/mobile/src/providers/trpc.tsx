import { AppRouter } from '@repo/api';
import { useQueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { PropsWithChildren } from 'react';
import superjson from 'superjson';

import { env } from '@/env';
import { supabase } from '@/lib/supabase/client';
import { TRPCClientProvider } from '@/lib/trpc';

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      headers: getHeaders,
      transformer: superjson,
      url: env.EXPO_PUBLIC_TRPC_URL,
    }),
  ],
});

export function TRPCProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  return (
    <TRPCClientProvider queryClient={queryClient} trpcClient={trpcClient}>
      {children}
    </TRPCClientProvider>
  );
}

async function getHeaders() {
  const headers: Record<string, string> = {};
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session !== null) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  return headers;
}
