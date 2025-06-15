'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

export type NavItemIn<T> = T & {
  segment: null | string;
};

export type NavItemOut<T> = NavItemIn<T> & {
  current: boolean;
  href: string;
};

export function useActiveNav<T>(
  nav: NavItemIn<T>[],
  root: string
): NavItemOut<T>[] {
  const segment = useSelectedLayoutSegment();
  return nav.map((item) => ({
    ...item,
    current: item.segment === segment,
    href: item.segment === null ? root : `${root}/${item.segment}`,
  }));
}
