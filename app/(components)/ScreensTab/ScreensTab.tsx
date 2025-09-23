import { ArrowUpRight, Plus } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle, Typography } from '@/src/components/ui';
import { ROUTES } from '@/src/utils/constants';

export const ScreensTab = () => {
  // todo request for screens

  return (
    <Card>
      <CardHeader>
        <Typography tag='h2' variant='h2'>
          Создать экран из шаблона
        </Typography>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
            <Card className='group hover:bg-accent cursor-pointer transition-all duration-200'>
              <Link href={ROUTES.CREATE_SCREEN}>
                <CardHeader className='pb-4'>
                  <CardTitle className='flex items-center justify-between'>
                    Пустой шаблон
                    <ArrowUpRight className='h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex h-32 items-center justify-center'>
                  <Plus className='animation-200 h-8 w-8 transition-transform group-hover:scale-110' />
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
