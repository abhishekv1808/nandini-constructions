import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/** CLAUDE.md §3.5 — primary | secondary | ghost | whatsapp; 48px min height on mobile. */
const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-white shadow-sm hover:bg-brand-dark focus-visible:outline-brand',
        secondary: 'border-ink text-ink hover:bg-ink border bg-transparent hover:text-white',
        ghost: 'text-ink hover:bg-sand bg-transparent',
        whatsapp: 'bg-whatsapp text-white shadow-sm hover:brightness-95',
        inverse: 'text-ink hover:bg-sand bg-white shadow-sm',
        'outline-light': 'border border-white/70 bg-transparent text-white hover:bg-white/10',
      },
      size: {
        default: 'h-12 px-6 text-base md:h-11 [&_svg]:size-5',
        lg: 'h-14 px-8 text-lg [&_svg]:size-5',
        sm: 'h-11 px-5 text-[0.9375rem] md:h-10 [&_svg]:size-4',
        icon: 'size-11 [&_svg]:size-5',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
