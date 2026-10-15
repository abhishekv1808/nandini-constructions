'use client';

import { ChevronDownIcon } from 'lucide-react';
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function NavigationMenu({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root className={cn('relative flex items-center', className)} {...props}>
      {children}
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List className={cn('flex items-center gap-1', className)} {...props} />;
}

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const navLinkClass =
  'inline-flex h-10 items-center gap-1 rounded-full px-3 text-[0.9375rem] font-medium text-ink/85 transition-colors hover:bg-sand hover:text-ink data-[active]:text-brand-dark';

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger className={cn(navLinkClass, 'group', className)} {...props}>
      {children}
      <ChevronDownIcon
        className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
        strokeWidth={1.5}
        aria-hidden
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        'absolute top-full left-0 mt-2 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out',
        className,
      )}
      {...props}
    />
  );
}

export const NavigationMenuLink = NavigationMenuPrimitive.Link;
