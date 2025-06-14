import { documentRouter } from '@/router/document';
import { createTRPCRouter } from '@/trpc';

export const appRouter = createTRPCRouter({
  document: documentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
