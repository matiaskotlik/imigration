'use client';

import { ChevronDownIcon, LogOutIcon, SidebarIcon } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { Suspense } from 'react';
import {
  CurrentNamedAvatar,
  NamedAvatarSkeleton,
} from '@/components/user/avatar';
import { Breadcrumbs } from '@/components/app/breadcrumbs';

const userMenu = [
  {
    href: '/auth/logout',
    icon: LogOutIcon,
    name: 'Sign out',
  },
];

export function AppShellHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className='bg-background flex h-12 w-full items-center gap-2 border-b px-2'>
      <Button onClick={toggleSidebar} size='icon-sm' variant='ghost'>
        <SidebarIcon />
      </Button>
      <div className='h-full py-3'>
        <Separator orientation='vertical' />
      </div>
      <Breadcrumbs />
      <div className='flex-1'></div>
      <UserMenu />
    </header>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <Suspense fallback={<NamedAvatarSkeleton />}>
            <CurrentNamedAvatar />
          </Suspense>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' collisionPadding={4}>
        <DropdownMenuGroup>
          {userMenu.map((item) => (
            <DropdownMenuItem asChild key={item.name}>
              <Link href={item.href}>
                <item.icon className='size-5' />
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
