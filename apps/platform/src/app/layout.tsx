import type { Metadata } from 'next';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import QueryProvider from '@/providers/query-provider';
import { BrandFont, CodeFont, PrimaryFont } from '@/components/brand/font';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export const metadata: Metadata = {
  description: 'iMigration Admin Dashboard',
  title: {
    default: 'iMigration Admin Dashboard',
    template: '%s | iMigration Admin',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta content='Kiltok, LLC' name='copyright' />
        <meta
          content='iMigration Admin Dashboard'
          name='apple-mobile-web-app-title'
        />
      </head>
      <body
        className={cn(
          '@container/main flex min-h-dvh flex-col antialiased',
          PrimaryFont.className,
          CodeFont.variable,
          BrandFont.variable
        )}
      >
        <QueryProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
