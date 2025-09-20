import { Button } from '@/src/components/ui';

import type { BuilderElement } from '@/app/dragdrop/types';
import { isParentElement } from '@/app/dragdrop/types';

export const NodeRenderer = ({ element }: { element: BuilderElement }) => {
  if (isParentElement(element)) {
    const layoutClass = element.type === 'row' ? 'flex-row' : 'flex-col';

    return (
      <div className={`flex gap-4 ${layoutClass} ${element.margin} ${element.width} ${element.height}`}>
        {(element.children ?? []).map((child) => (
          <NodeRenderer key={child.id} element={child} />
        ))}
      </div>
    );
  }

  if (element.type === 'button') {
    return (
      <Button className={`${element.margin} ${element.width} ${element.height}`}>
        {element.text}
      </Button>
    );
  }

  if (element.type === 'input') {
    return (
      <input
        className={`border-border text-foreground rounded-md border px-3 py-2 text-sm ${element.margin} ${element.width} ${element.height}`}
        placeholder={element.text}
      />
    );
  }

  if (element.type === 'switch') {
    return (
      <label
        className={`text-foreground flex items-center gap-3 text-sm ${element.margin} ${element.width} ${element.height}`}
      >
        <span className='bg-muted-foreground/30 relative inline-flex h-6 w-11 items-center rounded-full p-1'>
          <span className='bg-primary inline-block size-4 rounded-full shadow transition-all' />
        </span>
        <span>{element.text}</span>
      </label>
    );
  }

  return null;
};
