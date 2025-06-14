import {
  defaultShouldDehydrateQuery,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { GenericSchema } from '@/lib/supabase/generic-schema';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        shouldRedactErrors: (_err) => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false;
        },
      },
      queries: {
        retry: process.env.NODE_ENV === 'development' ? false : 2,
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error(error);
        // eslint-disable-next-line unicorn/prefer-global-this
        if (typeof window !== 'undefined' && query.meta?.errorMessage) {
          toast.error(query.meta.errorMessage as string);
        }
      },
    }),
  });
}

export const unwrap = async <
  Schema extends GenericSchema,
  Row extends Record<string, unknown>,
  Result,
  RelationName extends string,
  Relationships extends Record<string, GenericSchema>,
>(
  query: PostgrestFilterBuilder<
    Schema,
    Row,
    Result,
    RelationName,
    Relationships
  >
) => {
  const result = await query;
  return result.data;
};
