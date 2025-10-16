'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/src/utils/helpers';

const Switch = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & { ref?: React.RefObject<React.ElementRef<typeof SwitchPrimitives.Root> | null> }) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      'data-[state=unchecked]:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 peer data-[state=checked]:bg-primary inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-sm transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb className='bg-background pointer-events-none block size-4 translate-x-0.5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[18px]' />
  </SwitchPrimitives.Root>
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
