'use client';

import Link from 'next/link';
import * as React from 'react';
import { PropsWithChildren } from 'react';

import { Container } from '@/components/ui/container';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Section } from '@/components/ui/section';
import { H2 } from '@/components/ui/typography';

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
