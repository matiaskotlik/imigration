import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

function buildQueryClient() {
  return new QueryClient();
}

export function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => buildQueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
