import { useIsFocused } from '@react-navigation/native';
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { useRefreshOnFocus } from '@/hooks/use-refresh-on-focus';

export const useRNQuery = <Q, E, D, K extends QueryKey>(
  opts: UseQueryOptions<Q, E, D, K>
) => {
  const isFocused = useIsFocused();

  const result = useQuery({
    ...opts,
    subscribed: opts.subscribed && isFocused,
  });

  useRefreshOnFocus(result.refetch);

  return result;
};

export const useRNSuspenseQuery = <Q, E, D, K extends QueryKey>(
  opts: UseSuspenseQueryOptions<Q, E, D, K>
) => {
  const isFocused = useIsFocused();

  const result = useSuspenseQuery({
    ...opts,
    subscribed: opts.subscribed && isFocused,
  });

  useRefreshOnFocus(result.refetch);

  return result;
};
