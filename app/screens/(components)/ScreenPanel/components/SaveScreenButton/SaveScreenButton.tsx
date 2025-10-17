'use client';

import { Button } from '@/src/components/ui';
import { useScreenContext } from '@/src/utils/contexts/screen';

export const SaveScreenButton = () => {
  const screenContext = useScreenContext();

  return (
    <>
      {screenContext.action === 'create' && (
        <Button onClick={() => screenContext.saveScreen()}>Сохранить экран на сервер</Button>
      )}
      {screenContext.action === 'update' && (
        <div className='flex gap-4'>
          <Button variant='secondary' onClick={() => screenContext.saveScreen()}>
            Сохранить новую версию на сервер
          </Button>
          <Button onClick={() => screenContext.updateScreen()}>
            Сохранить текущую версию на сервер
          </Button>
        </div>
      )}
    </>
  );
};
