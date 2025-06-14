import { PropsWithChildren } from 'react';
import {
  dehydrate,
  HydrationBoundary as QueryHydrationBoundary,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { dbId, validId } from '@/lib/id';
import { makeQueryClient } from '@/lib/query';
import { currentDocumentQueryOptions } from '@/queries/current-document';
import { DocumentIdProvider } from '@/lib/app-context';

export default async function DocumentLayout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ documentId: string }>;
}>) {
  const { documentId } = await params;

  // handle invalid uuid early
  if (!validId(documentId, true)) {
    notFound();
  }

  const queryClient = makeQueryClient();
  void queryClient.prefetchQuery(currentDocumentQueryOptions(dbId(documentId)));

  return (
    <QueryHydrationBoundary state={dehydrate(queryClient)}>
      <DocumentIdProvider value={dbId(documentId)}>
        {children}
      </DocumentIdProvider>
    </QueryHydrationBoundary>
  );
}
