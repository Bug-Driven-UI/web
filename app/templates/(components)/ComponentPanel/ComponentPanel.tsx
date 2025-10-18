'use client';

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

import { ComponentEditor, CompositeComponentForm, CreateStatesForm } from './components';

export const ComponentPanel = () => {
  const componentsContext = useComponentsContext();
  const dragDropContext = useDragDropContext();

  return (
    <Sheet
      onOpenChange={(open) => !open && dragDropContext.updateActiveComponent(undefined)}
      open={!!dragDropContext.activeComponent}
    >
      <SheetContent className='max-w-2xl sm:max-w-3xl'>
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
        <div className='flex flex-col gap-10 overflow-auto p-4 pt-0'>
          {dragDropContext.activeComponent &&
            dragDropContext.activeComponent.type === 'stateful' && (
              <CreateStatesForm activeComponent={dragDropContext.activeComponent} />
            )}

          {dragDropContext.activeComponent && dragDropContext.activeComponent?.type !== 'row' && (
            <ComponentEditor {...dragDropContext.activeComponent} />
          )}
          {(dragDropContext.activeComponent?.type === 'row' ||
            dragDropContext.activeComponent?.type === 'column' ||
            dragDropContext.activeComponent?.type === 'box' ||
            dragDropContext.activeComponent?.type === 'dynamicColumn' ||
            dragDropContext.activeComponent?.type === 'dynamicRow') && (
            <CompositeComponentForm
              componentId={dragDropContext.activeComponent.id}
              componentType={dragDropContext.activeComponent.type}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
