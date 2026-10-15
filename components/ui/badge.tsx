import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide whitespace-nowrap',
  {
    variants: {
      variant: {
        brand: 'bg-brand-soft text-brand-dark',
        neutral: 'border-line text-ink border bg-white',
        success: 'bg-success/10 text-success',
        dark: 'bg-ink text-white',
      },
    },
    defaultVariants: { variant: 'brand' },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}
