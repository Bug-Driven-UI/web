'use client';

import type { DragendEvent, TransferEvent, TransferEventData } from '@formkit/drag-and-drop';

// todo use to drop only when dropped
import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { NodeRenderer } from '@/src/components/render';
import { Button } from '@/src/components/ui';

import type { AcceptsFn, BuilderElement, LeafNode, ParentNode } from './types';

import { TEMPLATE_LIBRARY } from './constants';
import { isLeafElement, isLeafType, isParentElement, isParentType } from './types';

const DragDropPage = () => {
  const templateLibrary = useMemo(() => TEMPLATE_LIBRARY, []);

  const accepts: AcceptsFn = useCallback((targetParent, _initialParent, _currentParent, state) => {
    const targetType = targetParent.el.dataset.containerType;
    const draggedValue = state.pointerDown?.node.data.value as BuilderElement | undefined;

    if (!draggedValue || !targetType) {
      return true;
    }

    if (targetType === 'palette') {
      return false;
    }

    if (targetType === 'root') {
      return isParentType(draggedValue.type);
    }

    if (targetType === 'row' || targetType === 'column') {
      if (isParentType(draggedValue.type)) {
        const draggedNodes = (state as { draggedNodes?: Array<{ el: HTMLElement }> }).draggedNodes;
        if (draggedNodes?.[0]?.el.contains(targetParent.el)) {
          return false;
        }

        return true;
      }

      return isLeafType(draggedValue.type);
    }

    return true;
  }, []);

  const paletteConfig = useMemo(
    () => ({
      name: 'palette',
      group: 'builder',
      sortable: false,
      dropZone: false,
      dragDropEffect: 'copy' as const,
      dragEffectAllowed: 'copy' as const,
      accepts
    }),
    [accepts]
  );

  const [paletteRef, paletteItems, setPaletteItems, configurePalette] = useDragAndDrop<
    HTMLDivElement,
    BuilderElement
  >(templateLibrary, paletteConfig);

  const canvasConfig = useMemo(
    () => ({
      name: 'canvas',
      group: 'builder',
      dropZone: true,
      accepts
    }),
    [accepts]
  );

  const [canvasRef, canvasElements, setCanvasElements, configureCanvas] = useDragAndDrop<
    HTMLDivElement,
    BuilderElement
  >([], canvasConfig);

  const resetPalette = useCallback(() => {
    setPaletteItems(
      templateLibrary.map((template) => {
        if (isParentElement(template)) {
          return {
            ...template,
            children: []
          } as BuilderElement;
        }

        return { ...template } as BuilderElement;
      })
    );
  }, [setPaletteItems, templateLibrary]);

  const handleTransfer = useCallback<DragendEvent>(
    (event) => {
      const data = event as unknown as TransferEventData<BuilderElement>;
      const sourceName = data.sourceParent.data.config.name;
      if (sourceName !== 'palette') {
        return;
      }

      const currentValues = (data.targetParent.data.getValues(data.targetParent.el) ??
        []) as BuilderElement[];

      const templateMap = new Map<string, BuilderElement>();
      data.draggedNodes.forEach((node) => {
        const value = node.data.value as BuilderElement;
        templateMap.set(value.id, value);
      });

      if (!templateMap.size) {
        return;
      }

      const placeholderIds = new Set(templateMap.keys());
      const sanitizedValues = currentValues.filter((item) => !placeholderIds.has(item.id));

      const hasIndex = typeof data.targetIndex === 'number' && data.targetIndex >= 0;
      const boundedTargetIndex = hasIndex
        ? Math.min(data.targetIndex as number, currentValues.length)
        : currentValues.length;

      const placeholdersBeforeTarget = hasIndex
        ? currentValues.slice(0, boundedTargetIndex).filter((item) => placeholderIds.has(item.id))
            .length
        : 0;

      const insertIndex = Math.max(
        Math.min(boundedTargetIndex - placeholdersBeforeTarget, sanitizedValues.length),
        0
      );

      const clones = data.draggedNodes.map((node) => {
        const value = node.data.value as BuilderElement;
        if (isParentType(value.type)) {
          return {
            ...value,
            id: crypto.randomUUID(),
            children: []
          } as BuilderElement;
        }

        return {
          ...value,
          id: crypto.randomUUID()
        } as BuilderElement;
      });

      const updated = [
        ...sanitizedValues.slice(0, insertIndex),
        ...clones,
        ...sanitizedValues.slice(insertIndex)
      ];

      data.targetParent.data.setValues(updated, data.targetParent.el);
      resetPalette();
    },
    [resetPalette]
  );

  useEffect(() => {
    configurePalette(paletteConfig);
  }, [configurePalette, paletteConfig]);

  useEffect(() => {
    configureCanvas({
      ...canvasConfig,
      onDragend: handleTransfer
    });
  }, [canvasConfig, configureCanvas, handleTransfer]);

  const updateElementChildren = useCallback(
    (targetId: string, children: BuilderElement[]) => {
      setCanvasElements((prev) => {
        const updateList = (items: BuilderElement[]): BuilderElement[] =>
          items.map((item) => {
            if (item.id === targetId && isParentElement(item)) {
              return {
                ...item,
                children
              };
            }

            if (isParentElement(item) && item.children && item.children.length) {
              return {
                ...item,
                children: updateList(item.children)
              };
            }

            return item;
          });

        return updateList(prev);
      });
    },
    [setCanvasElements]
  );

  const handleLogStructure = useCallback(() => {
    console.log('Current layout', canvasElements);
  }, [canvasElements]);

  const [showPreview, setShowPreview] = useState(false);
  const togglePreview = useCallback(() => {
    setShowPreview((prev) => !prev);
  }, []);

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
        <aside className='border-border/60 space-y-4 rounded-2xl border bg-white p-6 shadow-sm'>
          <div>
            <h2 className='text-foreground text-lg font-semibold'>Component palette</h2>
            <p className='text-muted-foreground text-sm'>
              Drag any component into the canvas or directly into a row/column.
            </p>
          </div>
          <div ref={paletteRef} className='grid gap-3' data-container-type='palette'>
            {paletteItems.map((item) => (
              <PaletteItem key={item.id} element={item} />
            ))}
          </div>
        </aside>

        <div className='space-y-4'>
          <div className='flex items-center justify-between gap-4'>
            <h2 className='text-foreground text-lg font-semibold'>Canvas</h2>
            <div className='flex items-center gap-2'>
              <Button className='px-4' size='sm' onClick={togglePreview}>
                {showPreview ? 'Hide preview' : 'Preview'}
              </Button>
              <Button className='px-4' size='sm' variant='secondary' onClick={handleLogStructure}>
                Log data
              </Button>
            </div>
          </div>
          <div
            ref={canvasRef}
            className='border-border/60 bg-muted/40 flex min-h-[320px] flex-col gap-4 rounded-2xl border border-dashed p-5'
            data-container-type='root'
          >
            {canvasElements.map((element) => (
              <BuilderNode
                key={element.id}
                accepts={accepts}
                element={element}
                updateChildrenById={updateElementChildren}
                onTransfer={handleTransfer}
              />
            ))}
            {canvasElements.length === 0 && (
              <p className='text-muted-foreground pointer-events-none text-center text-sm'>
                Drop a row or column layout here to start composing.
              </p>
            )}
          </div>
        </div>
      </section>

      {showPreview && (
        <section className='border-border/60 space-y-4 rounded-2xl border bg-white p-6 shadow-sm'>
          <header>
            <h2 className='text-foreground text-lg font-semibold'>Live preview</h2>
            <p className='text-muted-foreground text-sm'>
              Rendered output of your current layout configuration.
            </p>
          </header>

          {!!canvasElements.length && (
            <div className='flex flex-col gap-4'>
              {canvasElements.map((element) => (
                <NodeRenderer key={element.id} element={element} />
              ))}
            </div>
          )}
          {!canvasElements.length && (
            <p className='text-muted-foreground text-sm'>
              Nothing to preview yet. Add rows or columns to the canvas.
            </p>
          )}
        </section>
      )}
    </div>
  );
};

const BuilderNode = ({
  element,
  onTransfer,
  accepts,
  updateChildrenById
}: {
  element: BuilderElement;
  onTransfer: TransferEvent;
  accepts: AcceptsFn;
  updateChildrenById: (id: string, children: BuilderElement[]) => void;
}) => {
  if (isParentElement(element)) {
    return (
      <ContainerElement
        accepts={accepts}
        element={element}
        updateChildrenById={updateChildrenById}
        onTransfer={onTransfer}
      />
    );
  }

  return <LeafElement element={element as LeafNode} />;
};

const ContainerElement = ({
  element,
  onTransfer,
  accepts,
  updateChildrenById
}: {
  element: ParentNode;
  onTransfer: TransferEvent;
  accepts: AcceptsFn;
  updateChildrenById: (id: string, children: BuilderElement[]) => void;
}) => {
  const baseConfig = useMemo(
    () => ({
      name: `container-${element.id}`,
      group: 'builder',
      dropZone: true,
      accepts
    }),
    [element.id, accepts]
  );

  const [containerRef, containerValues, setContainerValues, configureContainer] = useDragAndDrop<
    HTMLDivElement,
    BuilderElement
  >(element.children ?? [], baseConfig);

  useEffect(() => {
    setContainerValues(element.children ?? []);
  }, [element.children, setContainerValues]);

  useEffect(() => {
    updateChildrenById(element.id, containerValues);
  }, [containerValues, element.id, updateChildrenById]);

  useEffect(() => {
    configureContainer({
      ...baseConfig,
      onTransfer
    });
  }, [baseConfig, configureContainer, onTransfer]);

  const isRow = element.type === 'row';

  return (
    <div className='border-border/60 rounded-2xl border bg-white p-5 shadow-sm'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
            {element.type}
          </p>
        </div>
        <div className='text-muted-foreground text-xs'>
          <div>Margin: {element.margin}</div>
          <div>Width: {element.width}</div>
          <div>Height: {element.height}</div>
        </div>
      </div>
      <div
        ref={containerRef}
        className={`border-border/60 bg-muted/30 relative mt-4 flex min-h-[140px] gap-3 rounded-xl border border-dashed p-3 ${
          isRow ? 'flex-row' : 'flex-col'
        }`}
        data-container-type={element.type}
      >
        {containerValues.map((child) => (
          <div key={child.id} className='flex-1'>
            <BuilderNode
              accepts={accepts}
              element={child}
              updateChildrenById={updateChildrenById}
              onTransfer={onTransfer}
            />
          </div>
        ))}
        {containerValues.length === 0 && (
          <div className='text-muted-foreground pointer-events-none absolute inset-0 flex items-center justify-center text-sm'>
            Drop components here
          </div>
        )}
      </div>
    </div>
  );
};

const LeafElement = ({ element }: { element: LeafNode }) => {
  return (
    <div className='border-border/60 flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm'>
      <div>
        <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
          {element.type}
        </p>
        <p className='text-foreground text-sm'>{element.text}</p>
      </div>
      <dl className='text-muted-foreground grid gap-1 text-xs'>
        <div className='flex justify-between'>
          <span>Margin</span>
          <span>{element.margin}</span>
        </div>
        <div className='flex justify-between'>
          <span>Width</span>
          <span>{element.width}</span>
        </div>
        <div className='flex justify-between'>
          <span>Height</span>
          <span>{element.height}</span>
        </div>
      </dl>
    </div>
  );
};

const PaletteItem = ({ element }: { element: BuilderElement }) => (
  <div className='border-border/60 bg-muted/30 rounded-xl border p-4'>
    <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
      {element.type}
    </p>
    {isLeafElement(element) && <p className='text-foreground text-sm'>{element.text}</p>}
  </div>
);

export default DragDropPage;
