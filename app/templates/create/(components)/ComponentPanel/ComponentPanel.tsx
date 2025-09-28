'use client';

import { useClickOutside } from '@siberiacancode/reactuse';
import { TrashIcon } from 'lucide-react';

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/src/components/ui';
import { useDragDropContext } from '@/src/utils/contexts/dragDrop';

import { ComponentEditor } from './components';

export const ComponentPanel = () => {
  const dragDropContext = useDragDropContext();
  const sheetRef = useClickOutside<HTMLDivElement>(() =>
    dragDropContext.updateActiveComponent(undefined)
  );

  return (
    <Sheet open={!!dragDropContext.activeComponent}>
      <SheetContent ref={sheetRef} className='max-w-xl sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>Edit {dragDropContext.activeComponent?.type} component</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
          <Button>
            <TrashIcon className='size-4' /> Remove
          </Button>
        </SheetHeader>
        {dragDropContext.activeComponent && (
          <ComponentEditor {...dragDropContext.activeComponent} />
        )}
      </SheetContent>
    </Sheet>
  );
};
