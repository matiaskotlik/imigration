import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { z, ZodError } from 'zod/v4';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@repo/supabase/database.types';

export type TRPCContext = {
  supabase: SupabaseClient<Database>;
};

export const t = initTRPC.context<TRPCContext>().create({
  errorFormatter: ({ error, shape }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError:
        error.cause instanceof ZodError
          ? z.flattenError(error.cause as ZodError<Record<string, unknown>>)
          : null,
    },
  }),
  transformer: superjson,
});

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev 100-500ms
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

export const publicProcedure = t.procedure.use(timingMiddleware);

export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(async ({ ctx, next }) => {
    const {
      data: { user },
    } = await ctx.supabase.auth.getUser();
    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  });
