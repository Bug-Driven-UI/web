'use client';

import { useTemplatePanelComponentsTab } from './hooks/useTemplatePanelComponentsTab';

export const TemplatePanelComponentsTab = () => {
  const { state } = useTemplatePanelComponentsTab();

  return (
    <div ref={state.baseComponentsRef} className='flex gap-3'>
      {state.baseComponents.map((baseComponent) => (
        <div
          key={baseComponent.id}
          className='bg-card hover:border-primary/40 border-card flex flex-col gap-2 rounded-2xl p-2 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg'
        >
          <span className='bg-background text-primary inline-flex items-center self-end rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] uppercase'>
            {'children' in baseComponent ? 'Composite' : 'Leaf'}
          </span>

          <p className='text-foreground text-base font-semibold capitalize'>{baseComponent.type}</p>
        </div>
      ))}
    </div>
  );
};
