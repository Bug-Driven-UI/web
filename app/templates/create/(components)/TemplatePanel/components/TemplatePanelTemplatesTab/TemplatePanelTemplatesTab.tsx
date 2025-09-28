'use client';

import type { UseTemplatePanelTemplatesTabParams } from './hooks/useTemplatePanelTemplatesTab';

import { useTemplatePanelTemplatesTab } from './hooks/useTemplatePanelTemplatesTab';

type TemplatePanelTemplatesTabProps = UseTemplatePanelTemplatesTabParams;

export const TemplatePanelTemplatesTab = (props: TemplatePanelTemplatesTabProps) => {
  const { state } = useTemplatePanelTemplatesTab(props);

  return (
    <div>
      <div ref={state.templateComponentsRef} className='mt-3 grid gap-3'>
        {state.templateComponents.map((templateComponent) => (
          <div key={templateComponent.id} className='bg-card border-card rounded-xl p-4'>
            <p className='font-semibold'>{templateComponent.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
