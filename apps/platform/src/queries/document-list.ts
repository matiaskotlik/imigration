import { Database } from '@repo/supabase/database.types';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import {
  InferInfiniteDataType,
  supabaseInfiniteQueryOptions,
} from '@/lib/supabase/utils';

export const documentListInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    ...supabaseInfiniteQueryOptions({
      getNextPageParam: (lastPage) => lastPage.at(-1)?.updatedAt,
      initialPageParam: null,
      query: (supabase: SupabaseClient<Database>) =>
        supabase
          .from('documents')
          .select(
            `
            id,
            name,
            description,
            updatedAt:updated_at,
            template
            `
          )
          .order('updated_at', { ascending: false })
          .limit(15),
      transformQuery: (query, datetime) =>
        datetime && query.lt('updated_at', datetime),
    }),
    meta: {
      errorMessage: 'Failed to load documents',
    },
    select: (data) => data.pages.flat(),
  });

export type DocumentListItem = InferInfiniteDataType<
  ReturnType<typeof documentListInfiniteQueryOptions>
>[number];

// for dev: hover to see type
let _: DocumentListItem;

export const useInfiniteDocumentList = () =>
  useSuspenseInfiniteQuery(documentListInfiniteQueryOptions());
