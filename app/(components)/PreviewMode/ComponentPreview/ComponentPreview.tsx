'use client';

import Image from 'next/image';

import type { RenderedComponent } from '@/generated/api/engine/models';

import { Button, Checkbox, Input, Progress } from '@/src/components/ui';
import { cn } from '@/src/utils/helpers';

import { getRenderedComponentStyle } from './helpers/getRenderedComponentStyle';

interface ComponentPreviewProps {
  component: RenderedComponent;
}

export const ComponentPreview = ({ component }: ComponentPreviewProps) => {
  const style = getRenderedComponentStyle(component);

  if (component.type === 'box') {
    const hasFlex = component.children.some((child) => child.width.type === 'weighted');

    return (
      <div className={cn(hasFlex && 'flex')} style={style}>
        {component.children.map((child) => (
          <ComponentPreview key={child.id} component={child} />
        ))}
      </div>
    );
  }

  if (component.type === 'row') {
    return (
      <div className={cn('flex')} style={style}>
        {component.children.map((child) => (
          <ComponentPreview key={child.id} component={child} />
        ))}
      </div>
    );
  }

  if (component.type === 'column') {
    return (
      <div className={cn('flex flex-col')} style={style}>
        {component.children.map((child) => (
          <ComponentPreview key={child.id} component={child} />
        ))}
      </div>
    );
  }

  if (component.type === 'button') {
    return (
      <Button disabled={!component.enabled} style={style}>
        <ComponentPreview component={component.text} />
      </Button>
    );
  }

  if (component.type === 'image') {
    return (
      <Image
        alt=''
        height={component.height.type === 'fixed' ? component.height.value : 20}
        src={component.imageUrl}
        style={style}
        width={component.width.type === 'fixed' ? component.width.value : 20}
      />
    );
  }

  if (component.type === 'input') {
    // todo
    return <Input style={style} />;
  }

  if (component.type === 'progressBar') {
    return <Progress style={style} />;
  }

  if (component.type === 'spacer') {
    return <div style={style} />;
  }

  if (component.type === 'text') {
    return <span style={style}>{component.textWithStyle.text}</span>;
  }

  if (component.type === 'switch') {
    return <Checkbox style={style} />;
  }
};
