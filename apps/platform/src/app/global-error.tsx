'use client';

import { PrimaryFont } from '@/components/brand/font';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { H1, H4, P } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Error',
};

export default function GlobalErrorPage() {
  return (
    <html className='bg-background dark' lang='en'>
      <body className={cn('flex min-h-dvh', PrimaryFont.className)}>
        <Section center viewport>
          <Container className='flex flex-col gap-4 text-center'>
            <P className='text-primary'>500</P>

            <H1>Page error</H1>

            <H4 className='text-muted-foreground'>
              There was an error loading this page.
            </H4>
          </Container>
        </Section>
      </body>
    </html>
  );
}
