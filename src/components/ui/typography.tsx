import type { VariantProps } from 'class-variance-authority';
import type { ElementType, ReactNode } from 'react';

import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';

const typography = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2 first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      paragraph: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-sm text-muted-foreground'
    }
  },
  defaultVariants: {
    variant: 'paragraph'
  }
});

interface TypographyProps extends VariantProps<typeof typography> {
  children: ReactNode;
  className?: string;
  tag?: ElementType;
}

export const Typography = ({
  variant = 'paragraph',
  tag: Component = 'p',
  children,
  className,
  ...props
}: TypographyProps) => {
  return (
    <Component className={clsx(typography({ variant }), className)} {...props}>
      {children}
    </Component>
  );
};
