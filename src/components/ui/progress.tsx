'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/src/utils/helpers';

const Progress = ({ ref, className, value, ...props }: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { ref?: React.RefObject<React.ElementRef<typeof ProgressPrimitive.Root> | null> }) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('bg-muted relative h-2 w-full overflow-hidden rounded-full', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className='bg-primary h-full flex-1 rounded-full transition-transform'
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
