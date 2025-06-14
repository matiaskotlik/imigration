import {
  InferDataType,
  redirectMissing,
  supabaseQueryOptions,
  TypedSupabaseClient,
} from '@/lib/supabase/utils';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useSurveyId } from '@/lib/app-context';

export const currentSurveyQueryOptions = (id: string) =>
  queryOptions({
    ...supabaseQueryOptions({
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
          .eq('id', id)
          .single(),
      transform: (data) => data,
      transformError: redirectMissing,
    }),
    meta: {
      errorMessage: 'Failed to load survey',
    },
  });

export type CurrentSurvey = InferDataType<
  ReturnType<typeof currentSurveyQueryOptions>
>;

// for dev: hover to see type
let _: CurrentSurvey;

export const useCurrentSurvey = () =>
  useSuspenseQuery(currentSurveyQueryOptions(useSurveyId())).data;
