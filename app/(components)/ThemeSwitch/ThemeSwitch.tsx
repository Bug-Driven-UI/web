// components/theme-switch.tsx
'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger
} from '@/src/components/ui';
import { cn } from '@/src/utils/helpers';

export const ThemeSwitch = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme ?? theme) === 'dark';

  return (
    <DropdownMenu>
      {/* Icon button (shadcn docs layout) */}
      <DropdownMenuTrigger asChild>
        <Button aria-label='Toggle theme' className='relative' size='icon' variant='ghost'>
          {/* Sun for light */}
          <Sun className='h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          {/* Moon for dark */}
          <Moon className='absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>
            {mounted && isDark ? 'Switch to light' : 'Switch to dark'}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' sideOffset={6}>
        <DropdownMenuRadioGroup
          value={mounted ? (theme ?? 'system') : 'system'}
          onValueChange={(value) => setTheme(value as 'dark' | 'light' | 'system')}
        >
          <DropdownMenuItem
            className={cn('flex items-center px-2 py-1', { 'bg-muted': theme === 'light' })}
            onClick={() => setTheme('light')}
          >
            <Sun className='mr-2 h-4 w-4' /> Light
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn('flex items-center px-2 py-1', { 'bg-muted': theme === 'dark' })}
            onClick={() => setTheme('dark')}
          >
            <Moon className='mr-2 h-4 w-4' /> Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn('flex items-center px-2 py-1', { 'bg-muted': theme === 'system' })}
            onClick={() => setTheme('system')}
          >
            <Monitor className='mr-2 h-4 w-4' /> System
          </DropdownMenuItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
