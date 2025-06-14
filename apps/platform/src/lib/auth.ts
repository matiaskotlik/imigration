import { cache } from 'react';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { pathname } from 'next-extra/pathname';

export const getSession = cache(async () => {
  // get userId from session to avoid waiting for auth to complete
  // this way the client can start sending off it's requests without having
  // to wait for supabase to validate the auth token
  const client = await createServerSupabase();
  const {
    data: { session },
  } = await client.auth.getSession();
  return session;
});

export const getSessionOrRedirect = async () => {
  const session = await getSession();
  if (session === null) {
    redirect(`/auth/login?next=${encodeURIComponent(await pathname())}`);
  }

  return session;
};
