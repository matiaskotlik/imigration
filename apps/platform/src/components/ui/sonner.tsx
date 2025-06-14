'use client';

import { ExternalToast, Toaster as Sonner, ToasterProps } from 'sonner';
import { CSSProperties, ReactNode } from 'react';

export type ToastOptions = {
  title: (() => ReactNode) | ReactNode;
} & ExternalToast;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className='toaster group'
      richColors={true}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-border': 'var(--border)',
          '--normal-text': 'var(--popover-foreground)',
        } as CSSProperties
      }
      theme='light'
      {...props}
    />
  );
};

export { Toaster };
