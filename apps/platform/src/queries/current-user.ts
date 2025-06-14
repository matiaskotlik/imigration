import {
  InferDataType,
  supabaseQueryOptions,
  TypedSupabaseClient,
} from '@/lib/supabase/utils';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useUserId } from '@/lib/app-context';

export const currentUserQueryOptions = (id: string) =>
  queryOptions({
    ...supabaseQueryOptions({
      query: (supabase: TypedSupabaseClient) =>
        supabase
          .from('users')
          .select(
            `
      id,
      name,
      avatarUrl:avatar_url
    `
          )
          .eq('id', id)
          .single(),
      transform: (data) => data,
    }),
    meta: {
      errorMessage: 'Failed to load user',
    },
  });

export type CurrentUser = InferDataType<
  ReturnType<typeof currentUserQueryOptions>
>;

let _: CurrentUser;

export const useCurrentUser = () =>
  useSuspenseQuery(currentUserQueryOptions(useUserId())).data;
