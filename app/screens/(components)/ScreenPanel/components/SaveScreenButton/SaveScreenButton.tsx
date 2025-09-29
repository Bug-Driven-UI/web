'use client';

import { Button } from '@/src/components/ui';
import { useScreenContext } from '@/src/utils/contexts/screen';

export const SaveScreenButton = () => {
  const screenContext = useScreenContext();

  return <Button onClick={() => screenContext.saveScreen()}>Сохранить экран на сервер</Button>;
};
