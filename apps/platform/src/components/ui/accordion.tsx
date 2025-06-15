'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { twc } from 'react-twc';

import { cn } from '@/lib/utils';

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot='accordion' {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={className}
      data-slot='accordion-item'
      {...props}
    />
  );
}

const AccordionIcon = twc(
  ChevronDownIcon
)`text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200`;

function AccordionContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm',
        className
      )}
      data-slot='accordion-content'
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  );
}

function AccordionTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Trigger
      className={cn('[&[data-state=open]>svg]:rotate-180', className)}
      data-slot='accordion-trigger'
      {...props}
    >
      {children}
    </AccordionPrimitive.Trigger>
  );
}

export {
  Accordion,
  AccordionContent,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
};
