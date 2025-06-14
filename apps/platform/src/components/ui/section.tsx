import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, StyledPropsWithChildren } from '@/lib/utils';

const sectionVariants = cva('not-first-of-type:pt-0 w-full', {
  defaultVariants: {
    center: false,
    size: 'md',
    viewport: false,
  },
  variants: {
    center: {
      true: 'flex flex-col items-center justify-center',
    },
    size: {
      lg: 'py-10',
      md: 'py-8',
      sm: 'py-6',
      xs: 'py-4',
    },
    viewport: {
      true: 'flex-1',
    },
  },
});

function Section({
  center,
  children,
  className,
  size,
  viewport,
}: StyledPropsWithChildren & VariantProps<typeof sectionVariants>) {
  return (
    <section
      className={cn(sectionVariants({ center, className, size, viewport }))}
    >
      {children}
    </section>
  );
}

export { Section, sectionVariants };
