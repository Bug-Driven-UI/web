'use client';

import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useCallback, useEffect } from 'react';

import { Card, CardContent, CardHeader } from '@/src/components/ui';

import type { ComponentData, CompositeComponentData, LeafComponentData } from './types';

import { ScreenComponent } from './(components)';
import {
  COMPOSITE_COMPONENTS_LIBRARY,
  DRAG_AND_DROP_COMPONENT_NAME,
  LEAF_COMPONENTS_LIBRARY
} from './constants';
import { isCompositeComponent } from './types';

const DragDropPage = () => {
  const [leafComponentsLibraryRef, leafComponentsLibrary, setLeafComponentsLibrary] =
    useDragAndDrop<HTMLDivElement, LeafComponentData>(LEAF_COMPONENTS_LIBRARY, {
      name: DRAG_AND_DROP_COMPONENT_NAME.LIBRARY.LEAF,
      group: 'library',
      dropZone: false,
      plugins: [dropOrSwap({ shouldSwap: () => false })],
      onDragend: (data) => {
        setLeafComponentsLibrary(LEAF_COMPONENTS_LIBRARY);

        data.parent.data.setValues(
          data.parent.data
            .getValues(data.parent.el)
            .map((child) => ({ ...child, id: crypto.randomUUID() })),
          data.parent.el
        );
      }
    });
  // todo union with leaf library
  const [compositeComponentsLibraryRef, compositeComponentsLibrary, setCompositeComponentsLibrary] =
    useDragAndDrop<HTMLDivElement, CompositeComponentData>(COMPOSITE_COMPONENTS_LIBRARY, {
      name: DRAG_AND_DROP_COMPONENT_NAME.LIBRARY.COMPOSITE,
      group: 'library',
      dropZone: false,
      plugins: [dropOrSwap({ shouldSwap: () => false })],
      onDragend: (data) => {
        setCompositeComponentsLibrary(COMPOSITE_COMPONENTS_LIBRARY);

        data.parent.data.setValues(
          data.parent.data
            .getValues(data.parent.el)
            .map((child) => ({ ...child, id: crypto.randomUUID() })),
          data.parent.el
        );
      }
    });

  const [screenComponentsRef, screenComponents, setScreenComponents] = useDragAndDrop<
    HTMLDivElement,
    ComponentData
  >([], {
    name: DRAG_AND_DROP_COMPONENT_NAME.SCREEN,
    group: 'screen',
    dropZone: true,
    sortable: false,
    plugins: [dropOrSwap({ shouldSwap: () => false })]
  });

  const updateChildrenById = useCallback(
    (targetId: string, children: ComponentData[]) =>
      setScreenComponents((screenComponents) => {
        const updateList = (components: ComponentData[]): ComponentData[] =>
          components.map((component) => {
            if (component.id === targetId) {
              return {
                ...component,
                children
              };
            }

            if (isCompositeComponent(component) && component.children.length) {
              return {
                ...component,
                children: updateList(component.children)
              };
            }

            return component;
          });

        return updateList(screenComponents);
      }),
    []
  );

  useEffect(() => {
    console.log('#screenComponents', screenComponents);
  }, [screenComponents]);

  return (
    <div className='mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12'>
      <header className='flex flex-col gap-3'>
        <h1 className='text-foreground text-3xl font-semibold'>Drag &amp; drop builder</h1>
        <p className='text-muted-foreground text-sm'>
          Drag elements from the palette into rows or columns. Each item tracks text, margin, width,
          and height so you can serialize the layout for requests.
        </p>
      </header>

      <section className='grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]'>
        <Card>
          <CardHeader>
            <div>
              <h2 className='text-foreground text-lg font-semibold'>Component palette</h2>
              <p className='text-muted-foreground text-sm'>
                Drag any component into the canvas or directly into a row/column.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div
              ref={leafComponentsLibraryRef}
              className='grid gap-3'
              data-container-type={DRAG_AND_DROP_COMPONENT_NAME.LIBRARY.LEAF}
            >
              {leafComponentsLibrary.map((leafComponent) => (
                <div
                  key={leafComponent.type}
                  className='border-border/60 bg-muted/30 rounded-xl border p-4'
                >
                  <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
                    {leafComponent.type}
                  </p>
                </div>
              ))}
            </div>
            <div
              ref={compositeComponentsLibraryRef}
              className='mt-3 grid gap-3'
              data-container-type={DRAG_AND_DROP_COMPONENT_NAME.LIBRARY.COMPOSITE}
            >
              {compositeComponentsLibrary.map((compositeComponent) => (
                <div
                  key={compositeComponent.type}
                  className='border-border/60 bg-muted/30 rounded-xl border p-4'
                >
                  <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
                    {compositeComponent.type}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className='space-y-2'>
          <div
            ref={screenComponentsRef}
            className='border-border/60 bg-muted/40 flex min-h-[320px] flex-col gap-4 rounded-2xl border border-dashed p-5'
            data-container-type={DRAG_AND_DROP_COMPONENT_NAME.SCREEN}
          >
            {screenComponents.map((screenComponent) => (
              <ScreenComponent
                key={screenComponent.id}
                updateChildrenById={updateChildrenById}
                component={screenComponent}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DragDropPage;
