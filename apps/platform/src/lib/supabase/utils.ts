import {
  AuthTokenResponsePassword,
  PostgrestError,
  SupabaseClient,
  User,
  UserResponse,
} from '@supabase/supabase-js';
import {
  PG_INVALID_TEXT_REPRESENTATION,
  PGRST_SINGULAR_RESPONSE_ITEM_COUNT_MISMATCH,
} from '@repo/supabase/error';
import { notFound } from 'next/navigation';
import {
  PostgrestBuilder,
  PostgrestFilterBuilder,
} from '@supabase/postgrest-js';
import {
  GetNextPageParamFunction,
  GetPreviousPageParamFunction,
  infiniteQueryOptions,
  queryOptions,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { encode } from '@supabase-cache-helpers/postgrest-react-query';
import { supabase } from '@/lib/supabase/client';
import { isPostgrestTransformBuilder } from '@supabase-cache-helpers/postgrest-core';
import { createServerSupabase } from '@/lib/supabase/server';
import { Database } from '@repo/supabase/database.types';
import { GenericSchema } from '@repo/supabase/generic';

export type InferDataType<T> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends UseQueryOptions<infer U, any, any, any> ? U : never;

export type InferInfiniteDataType<T> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends UseInfiniteQueryOptions<any, any, infer U, any, any> ? U : never;

export type QueryBuilder<T> = (client: SupabaseClient<Database>) => T;

export const isMissingError = (err: unknown) => {
  return (
    err instanceof PostgrestError &&
    (err.code === PGRST_SINGULAR_RESPONSE_ITEM_COUNT_MISMATCH || // no rows found (or too many!)
      err.code === PG_INVALID_TEXT_REPRESENTATION) // invalid uuid
  );
};

export const redirectMissing = (err: unknown) => {
  if (
    err instanceof PostgrestError &&
    (err.code === PGRST_SINGULAR_RESPONSE_ITEM_COUNT_MISMATCH || // no rows found (or too many!)
      err.code === PG_INVALID_TEXT_REPRESENTATION) // invalid uuid
  ) {
    console.debug(`Not found (error code ${err.code}), redirecting...`);
    notFound();
  }
  throw err;
};

export const unwrapUser = ({ data, error }: UserResponse): { user: User } => {
  if (error) {
    throw error;
  }
  return data;
};

export const unwrapAuthTokenPassword = ({
  data,
  error,
}: AuthTokenResponsePassword) => {
  if (error) {
    throw error;
  }
  return data;
};

export const unwrapSignout = ({ error }: { error: Error | null }) => {
  if (error) {
    throw error;
  }
  return null;
};

export const isomorphicSupabase = async () =>
  // eslint-disable-next-line unicorn/prefer-global-this
  typeof window === 'undefined' ? await createServerSupabase() : supabase;

export const supabaseInfiniteQueryOptions = <
  TPageParam,
  SupabaseQueryData,
  TQueryFnData = SupabaseQueryData,
  Schema extends GenericSchema = GenericSchema,
  Row extends Record<string, unknown> = Record<string, unknown>,
>({
  query: queryBuilder,
  transform = (data) => data as unknown as TQueryFnData,
  transformError = (err) => {
    throw err;
  },
  transformQuery,
  ...options
}: {
  getNextPageParam: GetNextPageParamFunction<TPageParam, TQueryFnData>;
  getPreviousPageParam?: GetPreviousPageParamFunction<TPageParam, TQueryFnData>;
  initialPageParam: TPageParam;
  query: QueryBuilder<PostgrestFilterBuilder<Schema, Row, SupabaseQueryData>>;
  transform?: (data: SupabaseQueryData, pageParam: TPageParam) => TQueryFnData;
  transformError?: (err: unknown) => TQueryFnData;
  transformQuery?: (
    query: PostgrestFilterBuilder<Schema, Row, SupabaseQueryData>,
    pageParam: TPageParam
  ) => unknown;
}) =>
  infiniteQueryOptions({
    queryFn: async ({ pageParam, signal }) => {
      const client = await isomorphicSupabase();
      const query = queryBuilder(client).abortSignal(signal);
      if (transformQuery !== undefined) {
        transformQuery(query, pageParam as TPageParam);
      }

      let result;
      try {
        result = await query.throwOnError();
      } catch (err) {
        return transformError(err);
      }

      return transform(result.data, pageParam as TPageParam);
    },
    queryKey: encode(queryBuilder(supabase), true),
    ...options,
  });

export const supabaseQueryOptions = <
  SupabaseQueryData,
  TData = SupabaseQueryData,
>({
  query: queryBuilder,
  transform,
  transformError = (err) => {
    throw err;
  },
}: {
  query: QueryBuilder<PostgrestBuilder<SupabaseQueryData>>;
  transform: (data: SupabaseQueryData) => TData; // it will not compile if this is optional
  transformError?: (err: unknown) => TData;
}) =>
  queryOptions({
    queryFn: async ({ signal }) => {
      const client = await isomorphicSupabase();
      const query = queryBuilder(client);
      if (isPostgrestTransformBuilder(query)) {
        query.abortSignal(signal);
      }

      let result;
      try {
        result = await query.throwOnError();
      } catch (err) {
        console.log('query fail', query, err);
        return transformError(err);
      }
      return transform(result.data);
    },
    queryKey: encode(queryBuilder(supabase), false),
  });
