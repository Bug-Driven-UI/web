import type { Metadata } from 'next';

import { Geist, Manrope } from 'next/font/google';
import Link from 'next/link';

import { Button, Toaster, Typography } from '@/src/components/ui';
import { ROUTES } from '@/src/utils/constants';

import { ThemeSwitch } from './(components)';
import { Providers } from './providers';

import './globals.css';

export const dynamic = 'force-dynamic';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic']
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'cyrillic']
});

export const metadata: Metadata = {
  title: 'Backend driven UI admin panel'
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => (
  <html lang='en'>
    <body
      className={`${geistSans.variable} ${manrope.variable} ${geistSans.className} antialiased`}
    >
      <Providers
        theme={{
          enableSystem: true,
          attribute: 'class',
          defaultTheme: 'system',
          disableTransitionOnChange: true
        }}
      >
        <Toaster className='z-[10003]' duration={3000} />
        <div className='bg-background relative min-h-screen overflow-hidden'>
          <header className='border-border/60 bg-card/80 supports-[backdrop-filter]:bg-card/70 relative isolate overflow-hidden border-b backdrop-blur'>
            <div className='via-primary/50 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent' />
            <div className='from-primary/20 via-primary/10 dark:from-primary/25 dark:via-primary/15 pointer-events-none absolute inset-x-8 top-0 h-24 rounded-full bg-gradient-to-b to-transparent blur-2xl' />

            <div className='relative px-6 py-4'>
              <nav className='flex flex-wrap items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-3'>
                    <Typography className='text-lg font-semibold tracking-tight'>
                      BUG-DRIVEN UI
                    </Typography>
                  </div>

                  <Link href={ROUTES.MAIN} className='group'>
                    <Button className='dark:text-white' variant='link'>
                      Главная
                    </Button>
                  </Link>
                </div>

                <ThemeSwitch />
              </nav>
            </div>
          </header>
          <div className='h-[calc(100vh-72px)] overflow-auto'>{children}</div>
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
