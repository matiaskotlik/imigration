import {
  PG_INVALID_TEXT_REPRESENTATION,
  PGRST_SINGULAR_RESPONSE_ITEM_COUNT_MISMATCH,
} from '@repo/supabase/error';
import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';
import { TRPCError } from '@trpc/server';

export const handleMissing = <T>(response: PostgrestSingleResponse<T>) => {
  if (
    response.error instanceof PostgrestError &&
    (response.error.code === PGRST_SINGULAR_RESPONSE_ITEM_COUNT_MISMATCH || // no rows found (or too many!)
      response.error.code === PG_INVALID_TEXT_REPRESENTATION) // invalid uuid
  ) {
    console.debug(
      `Not found (error code ${response.error.code}), throwing NOT_FOUND...`
    );
    throw new TRPCError({ code: 'NOT_FOUND' });
  }

  return response;
};

export const unwrap = <T>({ data, error }: PostgrestSingleResponse<T>): T => {
  if (error) {
    throw error;
  }
  return data;
};
