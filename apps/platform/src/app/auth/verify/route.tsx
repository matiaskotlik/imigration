import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { createLoader, parseAsString, parseAsStringLiteral } from 'nuqs/server';
import { NextRequest } from 'next/server';

const otpTypes = ['invite', 'recovery', 'email_change', 'email'] as const;

const verificationSearchParams = {
  next: parseAsString.withDefault('/'),
  token_hash: parseAsString,
  type: parseAsStringLiteral(otpTypes),
};

const loadVerificationSearchParams = createLoader(verificationSearchParams);

export async function GET(request: NextRequest) {
  const { next, token_hash, type } = loadVerificationSearchParams(
    request.nextUrl.searchParams
  );

  const supabase = await createServerSupabase();

  if (!type || !token_hash) {
    console.log('Missing/invalid type or token_hash');
    redirect('/auth/login');
  }

  const { error } = await supabase.auth.verifyOtp({ token_hash, type });
  if (error) {
    console.log('Error verifying OTP', error);
    redirect('/auth/login');
  }

  redirect(next);
}
