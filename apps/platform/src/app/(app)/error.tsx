'use client';

import { ErrorFallback } from '@/components/ui/error';

export const metadata = {
  title: 'Error',
};

export default function ErrorPage({
  error,
  reset,
}: {
  readonly error?: Error & { digest?: string };
  readonly reset?: () => void;
}) {
  const message = `${error?.name}:\n${error?.message}\n\nCaused by: ${error?.cause}\n\nStack Trace:\n${error?.stack}\n\nDigest: ${error?.digest}`;

  return <ErrorFallback message={message} resetErrorBoundary={reset} />;
}
