import {
  dehydrate,
  HydrationBoundary as QueryHydrationBoundary,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import { makeQueryClient } from '@/lib/query';
import { documentsInfiniteQueryOptions } from '@/queries/documents';

export default function DocumentListLayout({ children }: PropsWithChildren) {
  // prefetch queries
  const queryClient = makeQueryClient();
  void queryClient.prefetchInfiniteQuery(documentsInfiniteQueryOptions());

  return (
    <QueryHydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </QueryHydrationBoundary>
  );
}
