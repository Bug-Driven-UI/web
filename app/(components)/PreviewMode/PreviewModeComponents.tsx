'use client';

import type { RenderedScreenResponseSuccess } from '@/generated/api/engine/models';

import { ComponentPreview } from './ComponentPreview/ComponentPreview';

interface PreviewModeComponentsProps {
  screen: RenderedScreenResponseSuccess['screen'];
}

export const PreviewModeComponents = ({ screen }: PreviewModeComponentsProps) => {
  console.log('#screen', screen);
  return (
    <div className='mx-auto w-[300px] text-[20px]'>
      {screen.scaffold?.topBar && <ComponentPreview component={screen.scaffold.topBar} />}
      {screen.components.map((component) => (
        <ComponentPreview key={component.id} component={component} />
      ))}
      {screen.scaffold?.bottomBar && <ComponentPreview component={screen.scaffold.bottomBar} />}
    </div>
  );
};
