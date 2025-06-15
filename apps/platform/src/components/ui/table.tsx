'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ComponentProps, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

const tableContainerVariants = cva('relative w-full overflow-x-auto', {
  defaultVariants: {
    borderVariant: 'none',
  },
  variants: {
    borderVariant: {
      none: '',
      rounded: 'rounded-lg border',
    },
  },
});

export function Table({
  borderVariant,
  className,
  ...props
}: ComponentProps<'table'> & VariantProps<typeof tableContainerVariants>) {
  return (
    <div
      className={tableContainerVariants({ borderVariant })}
      data-slot='table-container'
    >
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        data-slot='table'
        {...props}
      />
    </div>
  );
}

export function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody
      className={cn('last-of-type:[&>tr:last-child]:border-0', className)}
      data-slot='table-body'
      {...props}
    />
  );
}

export function TableFooter({ className, ...props }: ComponentProps<'tfoot'>) {
  return (
    <tfoot
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className
      )}
      data-slot='table-footer'
      {...props}
    />
  );
}

export function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return (
    <thead
      className={cn('font-medium', className)}
      data-slot='table-header'
      {...props}
    />
  );
}

// https://mtsknn.fi/blog/relative-tr-in-safari/#step-1-alternative-for-position-relative
const tableRowVariants = cva(
  'data-[state=selected]:bg-muted translate-0 border-b transition-colors [clip-path:inset(0)]',
  {
    defaultVariants: {
      hover: true,
    },
    variants: {
      hover: {
        true: 'hover:bg-muted/50',
      },
    },
  }
);

export function TableCaption({
  className,
  ...props
}: ComponentProps<'caption'>) {
  return (
    <caption
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      data-slot='table-caption'
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return (
    <td
      className={cn(
        'whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      data-slot='table-cell'
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ComponentProps<'th'>) {
  return (
    <th
      className={cn(
        'text-muted-foreground h-10 whitespace-nowrap px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      data-slot='table-head'
      {...props}
    />
  );
}

export function TableRow({
  className,
  hover,
  ...props
}: ComponentProps<'tr'> & VariantProps<typeof tableRowVariants>) {
  return (
    <tr
      className={cn(tableRowVariants({ className, hover }))}
      data-slot='table-row'
      {...props}
    />
  );
}

// for clickable prop, see
// https://mtsknn.fi/blog/relative-tr-in-safari/#step-1-alternative-for-position-relative
export function TableRowTrigger({ children }: PropsWithChildren) {
  return <Slot className='absolute inset-0'>{children}</Slot>;
}
