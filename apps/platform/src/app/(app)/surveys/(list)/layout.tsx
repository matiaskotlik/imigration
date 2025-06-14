import {
  dehydrate,
  HydrationBoundary as QueryHydrationBoundary,
} from '@tanstack/react-query';
import { makeQueryClient } from '@/lib/query';
import { surveyListInfiniteQueryOptions } from '@/queries/survey-list';
import { PropsWithChildren } from 'react';

export default function SurveyListLayout({ children }: PropsWithChildren) {
  // prefetch queries
  const queryClient = makeQueryClient();
  void queryClient.prefetchInfiniteQuery(surveyListInfiniteQueryOptions());

  return (
    <QueryHydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </QueryHydrationBoundary>
  );
}
