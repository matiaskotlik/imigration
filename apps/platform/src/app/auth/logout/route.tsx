import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { createLoader, parseAsString } from 'nuqs/server';
import { NextRequest } from 'next/server';

const searchParams = {
  next: parseAsString.withDefault('/auth/login'),
};

const loadSearchParams = createLoader(searchParams);

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out', error);
  }

  const { next } = loadSearchParams(request.nextUrl.searchParams);
  redirect(next);
}
