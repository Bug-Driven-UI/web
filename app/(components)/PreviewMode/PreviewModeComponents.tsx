'use client';

import type { RenderedScreenResponseSuccess } from '@/generated/api/engine/models';

import { ComponentPreview } from './ComponentPreview/ComponentPreview';

interface PreviewModeComponentsProps {
  screen: RenderedScreenResponseSuccess['screen'];
}

export const PreviewModeComponents = ({ screen }: PreviewModeComponentsProps) => {
  return (
    <div className='flex justify-center py-6'>
      <div className='border-border/70 bg-background relative h-[932px] w-[390px] max-w-full overflow-y-auto rounded-[30px] border shadow-[0_18px_40px_-20px_rgba(15,23,42,0.4)]'>
        <div className='bg-background/95 font-manrope min-h-[640px] overflow-hidden rounded-[25px]'>
          {screen.scaffold?.topBar && <ComponentPreview component={screen.scaffold.topBar} />}
          <div className='flex flex-1 flex-col gap-4'>
            {screen.components.map((component) => (
              <ComponentPreview key={component.id} component={component} />
            ))}
          </div>
          {screen.scaffold?.bottomBar && <ComponentPreview component={screen.scaffold.bottomBar} />}
        </div>
      </div>
    </div>
  );
};
