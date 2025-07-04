import {
  dehydrate,
  HydrationBoundary as QueryHydrationBoundary,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import { makeQueryClient } from '@/lib/query';
import { surveysInfiniteQueryOptions } from '@/queries/surveys';

export default function SurveyListLayout({ children }: PropsWithChildren) {
  // prefetch queries
  const queryClient = makeQueryClient();
  void queryClient.prefetchInfiniteQuery(surveysInfiniteQueryOptions());

  return (
    <QueryHydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </QueryHydrationBoundary>
  );
}
