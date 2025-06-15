import { PropsWithChildren, Suspense } from 'react';

import { useHydration } from '@/hooks/use-hydration';

/**
 * Re-render children on hydration.
 *
 * Useful for re-rendering components that rely on browser apis like 'window', Date, etc.
 */
export default function Rehydrate({ children }: PropsWithChildren) {
  const hydrated = useHydration();
  return (
    <Suspense key={hydrated ? 'hydrated' : 'dehydrated'}>{children}</Suspense>
  );
}
