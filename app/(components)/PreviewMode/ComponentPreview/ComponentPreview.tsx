'use client';

import type { RenderedComponent } from '@/generated/api/engine/models';

import { Checkbox, Input, Progress } from '@/src/components/ui';
import { cn } from '@/src/utils/helpers';

import { getRenderedComponentStyle } from './helpers/getRenderedComponentStyle';

interface ComponentPreviewProps {
  className?: string;
  component: RenderedComponent;
}

export const ComponentPreview = ({ component, className }: ComponentPreviewProps) => {
  const style = getRenderedComponentStyle(component);

  if (component.type === 'box') {
    const hasFlex = component.children.some((child) => child.width.type === 'weighted');

    return (
      <div className={cn(className, hasFlex && 'flex')} style={style}>
        {component.children.map((child) => (
          <ComponentPreview key={child.id} component={child} />
        ))}
      </div>
    );
  }

  if (component.type === 'row') {
    return (
      <div className={className} style={style}>
        {component.children.map((child) => (
          <ComponentPreview key={child.id} component={child} />
        ))}
      </div>
    );
  }

  if (component.type === 'column') {
    return (
      <div className={className} style={style}>
        {component.children.map((child) => (
          <ComponentPreview key={child.id} component={child} />
        ))}
      </div>
    );
  }

  if (component.type === 'button') {
    return (
      <button className={className} disabled={!component.enabled} style={style}>
        <ComponentPreview component={component.text} />
      </button>
    );
  }

  if (component.type === 'image') {
    return (
      <img
        alt=''
        className={className}
        height={component.height.type === 'fixed' ? component.height.value : 20}
        src={component.imageUrl}
        style={style}
        width={component.width.type === 'fixed' ? component.width.value : 20}
        loading='lazy'
      />
    );
  }

  if (component.type === 'input') {
    // todo
    return (
      <>
        <div className='relative'>
          <Input
            className={className}
            type='text'
            value=''
            placeholder={component.placeholder?.textWithStyle.text}
          />
          {component.rightIcon && (
            <ComponentPreview
              className='absolute top-1/2 right-4 -translate-y-1/2 transform'
              component={component.rightIcon}
            />
          )}
        </div>
      </>
    );
  }

  if (component.type === 'progressBar') {
    return <Progress className={className} style={style} />;
  }

  if (component.type === 'spacer') {
    return <div className={className} style={style} />;
  }

  if (component.type === 'text') {
    return (
      <span className={className} style={{ ...style, display: 'inline-block' }}>
        {component.textWithStyle.text}
      </span>
    );
  }

  if (component.type === 'switch') {
    return <Checkbox className={className} style={style} />;
  }
};
