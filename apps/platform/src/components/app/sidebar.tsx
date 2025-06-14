'use client';

import { useActiveNav } from '@/hooks/use-active-nav';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FileQuestionIcon, FolderIcon, HomeIcon } from 'lucide-react';
import { BrandLogo, BrandTitle } from '@/components/brand/logo';

export function AppShellSidebar() {
  return (
    <Sidebar collapsible='icon'>
      <Header />
      <SidebarContent>
        <Nav />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

function Header() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href='/'>
              <BrandLogo className='size-4' />
              <BrandTitle />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

function Nav() {
  const navigation = useActiveNav(
    [
      { icon: HomeIcon, name: 'Home', segment: '' },
      { icon: FileQuestionIcon, name: 'Surveys', segment: 'surveys' },
      { icon: FolderIcon, name: 'Documents', segment: 'documents' },
    ],
    ''
  );

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={item.current}
                size='lg'
                tooltip={item.name}
              >
                <Link href={item.href}>
                  <item.icon />
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
