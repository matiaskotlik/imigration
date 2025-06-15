'use client';

import { CircleAlertIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  H4,
  MultilineCode,
  MultilineCodeCopy,
} from '@/components/ui/typography';

export function ErrorFallback({
  message,
  resetErrorBoundary,
}: {
  readonly message?: string;
  readonly resetErrorBoundary?: () => void;
}) {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4'>
      <CircleAlertIcon className='text-destructive size-10' />

      <H4>Something went wrong!</H4>

      <p className='text-muted-foreground'>
        There was an error loading this content.
      </p>

      <div className='flex gap-4'>
        {message ? (
          <Dialog defaultOpen={process.env.NODE_ENV === 'development'}>
            <DialogTrigger asChild>
              <Button variant='outline'>More Details</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Error Details</DialogTitle>

                <DialogDescription>
                  Technical details to help debug the issue or get help from the
                  team.
                </DialogDescription>
              </DialogHeader>

              <MultilineCode className='max-h-60 overflow-auto'>
                {message}

                <MultilineCodeCopy value={message} />
              </MultilineCode>
            </DialogContent>
          </Dialog>
        ) : null}

        {resetErrorBoundary ? (
          <Button onClick={resetErrorBoundary}>Try again</Button>
        ) : null}
      </div>
    </div>
  );
}
