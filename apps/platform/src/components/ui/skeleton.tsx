import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

export const skeletonVariants = cva('skeleton bg-accent animate-pulse', {
  defaultVariants: {
    fill: false,
    rounded: 'xl',
    size: 'none',
  },
  variants: {
    fill: {
      true: 'flex-1',
    },
    rounded: {
      full: 'rounded-full',
      xl: 'rounded-xl',
    },
    size: {
      description: 'h-4 w-56 has-[+.skeleton]:mb-2',
      label: 'h-4 w-24 has-[+.skeleton]:mb-2',
      none: '',
      title: 'h-6 w-32 has-[+.skeleton]:mb-4',
    },
  },
});

function Skeleton({
  className,
  fill,
  rounded,
  size,
  ...props
}: ComponentProps<'div'> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      className={skeletonVariants({ className, fill, rounded, size })}
      data-slot='skeleton'
      {...props}
    />
  );
}

export { Skeleton };
