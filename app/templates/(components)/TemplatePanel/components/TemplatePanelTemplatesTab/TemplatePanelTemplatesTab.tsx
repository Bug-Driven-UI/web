'use client';

import type { UseTemplatePanelTemplatesTabParams } from './hooks/useTemplatePanelTemplatesTab';

import { useTemplatePanelTemplatesTab } from './hooks/useTemplatePanelTemplatesTab';

type TemplatePanelTemplatesTabProps = UseTemplatePanelTemplatesTabParams;

export const TemplatePanelTemplatesTab = (props: TemplatePanelTemplatesTabProps) => {
  const { state } = useTemplatePanelTemplatesTab(props);

  return (
    <div ref={state.templateComponentsRef} className='flex gap-3'>
      {state.templateComponents.map((templateComponent) => (
        <div
          key={templateComponent.id}
          className='bg-card hover:border-primary/40 border-card flex flex-col gap-2 rounded-2xl p-2 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg'
        >
          <span className='bg-background text-primary inline-flex items-center self-end rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em]'>
            Template
          </span>

          <p className='text-foreground text-base font-semibold capitalize'>
            {templateComponent.type}
          </p>
        </div>
      ))}
    </div>
  );
};
