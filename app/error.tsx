'use client';

import { AlertTriangle, RotateCw } from 'lucide-react';
import { useEffect } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/components/ui';

import { setTabCookieAction } from './(actions)';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='bg-background flex h-full min-h-[480px] items-center justify-center px-6 py-12'>
      <section className='animate-in fade-in-50 slide-in-from-bottom-4 mx-auto w-full max-w-xl duration-300'>
        <Card className='border-border/60 shadow-primary/5 relative overflow-hidden shadow-lg'>
          <div className='from-primary/15 via-primary/5 dark:from-primary/20 dark:via-primary/10 pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent' />

          <CardHeader className='relative flex flex-col items-center gap-4 text-center'>
            <span className='border-primary/30 bg-primary/5 text-primary flex size-14 items-center justify-center rounded-full border'>
              <AlertTriangle aria-hidden='true' className='size-6' />
            </span>
            <CardTitle className='text-2xl font-semibold tracking-tight'>
              Something went wrong
            </CardTitle>
            <CardDescription className='max-w-md text-balance'>
              We ran into an unexpected issue. You can retry the last action and we will keep an eye
              on things.
            </CardDescription>
          </CardHeader>

          <CardContent className='flex flex-col items-center gap-4 pb-8 text-center'>
            {error?.message && (
              <p className='border-muted-foreground/30 bg-muted/40 text-muted-foreground rounded-md border border-dashed px-4 py-3 text-sm'>
                {error.message}
              </p>
            )}
            <Button
              className='gap-2 px-8'
              size='lg'
              onClick={() => {
                reset();
                setTabCookieAction('');
              }}
            >
              <RotateCw aria-hidden='true' className='size-5' />
              Retry
            </Button>
            {error?.digest && (
              <p className='text-muted-foreground text-xs'>Error ID: {error.digest}</p>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Error;
