import {
  dehydrate,
  HydrationBoundary as QueryHydrationBoundary,
} from '@tanstack/react-query';
import { makeQueryClient } from '@/lib/query';
import { documentListInfiniteQueryOptions } from '@/queries/document-list';
import { PropsWithChildren } from 'react';

export default function DocumentListLayout({ children }: PropsWithChildren) {
  // prefetch queries
  const queryClient = makeQueryClient();
  void queryClient.prefetchInfiniteQuery(documentListInfiniteQueryOptions());

  return (
    <QueryHydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </QueryHydrationBoundary>
  );
}
