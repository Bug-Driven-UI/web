'use client';

import Image from 'next/image';

import type { RenderedComponent } from '@/generated/api/engine/models';

import { Button, Checkbox, Input, Progress } from '@/src/components/ui';
import { cn } from '@/src/utils/helpers';

import { getRenderedComponentClassName } from './helpers/getRenderedComponentClassName';

interface ComponentPreviewProps {
  component: RenderedComponent;
}

export const ComponentPreview = ({ component }: ComponentPreviewProps) => {
  const className = getRenderedComponentClassName(component);

  if (component.type === 'box') {
    const hasFlex = component.children.some((child) => child.width.type === 'weighted');

    return (
      <div className={cn(className, hasFlex && 'flex')}>
        {component.children.map((child) => (
          <ComponentPreview key={child.id} component={child} />
        ))}
      </div>
    );
  }

  if (component.type === 'row') {
    return (
      <div className={cn('flex', className)}>
        {component.children.map((child) => (
          <ComponentPreview key={child.id} component={child} />
        ))}
      </div>
    );
  }

  if (component.type === 'column') {
    return (
      <div className={cn('flex flex-col', className)}>
        {component.children.map((child) => (
          <ComponentPreview key={child.id} component={child} />
        ))}
      </div>
    );
  }

  if (component.type === 'button') {
    return (
      <Button className={cn(className)} disabled={!component.enabled}>
        <ComponentPreview component={component.text} />
      </Button>
    );
  }

  if (component.type === 'image') {
    return (
      <Image
        alt=''
        className={cn(className)}
        height={component.height.type === 'fixed' ? component.height.value : 20}
        src={component.imageUrl}
        width={component.width.type === 'fixed' ? component.width.value : 20}
      />
    );
  }

  if (component.type === 'input') {
    // todo
    return <Input className={cn(className)} />;
  }

  if (component.type === 'progressBar') {
    return <Progress className={cn(className)} />;
  }

  if (component.type === 'spacer') {
    return <div className={cn(className)} />;
  }

  if (component.type === 'text') {
    return <span className={cn(className)}>{component.textWithStyle.text}</span>;
  }

  if (component.type === 'switch') {
    return <Checkbox className={cn(className)} />;
  }
};
