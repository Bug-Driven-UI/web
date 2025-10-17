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
import { useComponentsContext } from '@/src/utils/contexts/components';
import { useDragDropContext } from '@/src/utils/contexts/dragDrop';

import { ComponentEditor, CreateStatesForm } from './components';

export const ComponentPanel = () => {
  const componentsContext = useComponentsContext();
  const dragDropContext = useDragDropContext();
  const sheetRef = useClickOutside<HTMLDivElement>(() =>
    dragDropContext.updateActiveComponent(undefined)
  );

  return (
    <Sheet open={!!dragDropContext.activeComponent}>
      <SheetContent ref={sheetRef} className='max-w-xl sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle className='flex justify-between'>
            Изменить {dragDropContext.activeComponent?.type} компонент{' '}
            <Button
              variant='destructive'
              onClick={() => {
                componentsContext.removeComponentById(dragDropContext.activeComponent!.id);
                dragDropContext.removeComponentById(dragDropContext.activeComponent!.id);
                dragDropContext.updateActiveComponent(undefined);
              }}
            >
              <TrashIcon className='size-4' /> Remove
            </Button>
          </SheetTitle>
          <SheetDescription>
            После сохранения изменения не сохраняться на сервере. Нажмите кнопку сохранить на сервер
            для сохранения
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col gap-10 overflow-auto px-4'>
          {dragDropContext.activeComponent &&
            dragDropContext.activeComponent.type === 'stateful' && (
              <CreateStatesForm activeComponent={dragDropContext.activeComponent} />
            )}

          {dragDropContext.activeComponent && (
            <ComponentEditor {...dragDropContext.activeComponent} />
          )}
          {/* {dragDropContext.activeComponent?.type === 'row' && (
            <BaseComponentForm
              componentId={dragDropContext.activeComponent.id}
              componentType={dragDropContext.activeComponent.type}
            />
          )} */}
        </div>
      </SheetContent>
    </Sheet>
  );
};
