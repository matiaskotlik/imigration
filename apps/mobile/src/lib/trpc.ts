import type { AppRouter } from '@repo/api';

import { createTRPCContext } from '@trpc/tanstack-react-query';

export const {
  TRPCProvider: TRPCClientProvider,
  useTRPC,
  useTRPCClient,
} = createTRPCContext<AppRouter>();
