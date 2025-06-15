import { type NextRequest } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/ (Next.js static files)
     * - favicon.ico (favicon file)
     * - alerts (sentry)
     * - images (image files)
     */
    String.raw`/((?!_next|favicon.ico|alerts|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)`,
  ],
};
