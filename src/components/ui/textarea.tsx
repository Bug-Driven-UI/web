import * as React from 'react';

import { cn } from '@/src/utils/helpers';

const Textarea = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'textarea'> & { ref?: React.RefObject<HTMLTextAreaElement | null> }) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'border-input placeholder:text-muted-foreground flex min-h-[96px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 ring-inset focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
};
Textarea.displayName = 'Textarea';

export { Textarea };
