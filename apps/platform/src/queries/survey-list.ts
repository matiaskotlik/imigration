import {
  InferInfiniteDataType,
  supabaseInfiniteQueryOptions,
  TypedSupabaseClient,
} from '@/lib/supabase/utils';
import {
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

export const surveyListInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    ...supabaseInfiniteQueryOptions({
      getNextPageParam: (lastPage) => lastPage.at(-1)?.updatedAt,
      initialPageParam: null,
      query: (supabase: TypedSupabaseClient) =>
        supabase
          .from('surveys')
          .select(
            `
            id,
            name,
            description,
            updatedAt:updated_at,
            json
            `
          )
          .order('updated_at', { ascending: false })
          .limit(15),
      transformQuery: (query, datetime) =>
        datetime && query.lt('updated_at', datetime),
    }),
    meta: {
      errorMessage: 'Failed to load surveys',
    },
    select: (data) => data.pages.flat(),
  });

export type SurveyListItem = InferInfiniteDataType<
  ReturnType<typeof surveyListInfiniteQueryOptions>
>[number];

// for dev: hover to see type
let _: SurveyListItem;

export const useInfiniteSurveyList = () =>
  useSuspenseInfiniteQuery(surveyListInfiniteQueryOptions());
