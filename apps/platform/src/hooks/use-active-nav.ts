'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

export type NavItemIn<T> = {
  segment: null | string;
} & T;

export type NavItemOut<T> = {
  current: boolean;
  href: string;
} & NavItemIn<T>;

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
