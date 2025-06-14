'use client';

import { useIntersectionObserver } from 'usehooks-ts';
import { useEffect } from 'react';

export default function InfiniteScroller({
  count,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  count: number;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  const { isIntersecting, ref } = useIntersectionObserver();

  // depend on count to trigger fetch after new items get loaded, in case we are
  // still intersecting
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage, count]);

  return <span ref={ref} />;
}
