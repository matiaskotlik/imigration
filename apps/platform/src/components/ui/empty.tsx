import { twc } from 'react-twc';
import { Container } from '@/components/ui/container';

export const EmptyContainer = twc(
  Container
)`flex h-full flex-col items-center justify-center gap-2 [&>svg]:size-12`;

export const EmptyTitle = twc.h3`text-sm font-semibold`;

export const EmptyDescription = twc.p`text-muted-foreground text-sm`;
