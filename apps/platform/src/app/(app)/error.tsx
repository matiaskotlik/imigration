'use client';

import { ErrorFallback } from '@/components/ui/error';

export const metadata = {
  title: 'Error',
};

export default function ErrorPage({
  error,
  reset,
}: {
  error?: { digest?: string } & Error;
  reset?: () => void;
}) {
  const message = `${error?.name}:\n${error?.message}\n\nCaused by: ${error?.cause}\n\nStack Trace:\n${error?.stack}\n\nDigest: ${error?.digest}`;

  return <ErrorFallback message={message} resetErrorBoundary={reset} />;
}
