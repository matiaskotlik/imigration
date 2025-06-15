import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { StyledPropsWithChildren } from '@/lib/utils';

const containerVariants = cva('@bsm/main:px-6 @blg/main:px-8 mx-auto w-full', {
  defaultVariants: {
    fullWidthOnMobile: false,
    size: 'breakpoint',
  },
  variants: {
    fullWidthOnMobile: {
      false: 'px-4',
    },
    size: {
      breakpoint:
        '@bsm/main:max-w-bsm @bmd/main:max-w-bmd @blg/main:max-w-blg @bxl/main:max-w-bxl @b2xl/main:max-w-b2xl',
      full: '',
      narrow: 'max-w-sm',
      wide: 'max-w-7xl',
    },
  },
});

function Container({
  children,
  className,
  fullWidthOnMobile,
  size,
}: StyledPropsWithChildren & VariantProps<typeof containerVariants>) {
  return (
    <div className={containerVariants({ className, fullWidthOnMobile, size })}>
      {children}
    </div>
  );
}

export { Container, containerVariants };
