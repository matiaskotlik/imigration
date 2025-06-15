import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

import {
  NotFoundCaption,
  NotFoundContent,
  NotFoundDescription,
  NotFoundTitle,
} from '@/components/app/not-found';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';

export default function NotFoundPage() {
  return (
    <Section center viewport>
      <NotFoundContent>
        <NotFoundCaption>404</NotFoundCaption>

        <NotFoundTitle>Page not found</NotFoundTitle>

        <NotFoundDescription>
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </NotFoundDescription>

        <Button asChild>
          <Link href='/'>
            <ChevronLeftIcon />
            Back to home
          </Link>
        </Button>
      </NotFoundContent>
    </Section>
  );
}

export { notFoundMetadata as metadata } from '@/components/app/not-found';
