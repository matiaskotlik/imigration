'use client';

import * as React from 'react';
import { PropsWithChildren } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { H2 } from '@/components/ui/typography';
import Link from 'next/link';

export function Shell({ children }: PropsWithChildren) {
  return (
    <>
      <Section>
        <Container className='flex items-end justify-between'>
          <H2>
            <Link href='/'>iMigration Admin Dashboard</Link>
          </H2>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href='/(app)/surveys'>Survey List</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Container>
      </Section>
      {children}
    </>
  );
}
