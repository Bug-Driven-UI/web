'use client';

import { Input } from '@/src/components/ui';
import { useTemplateContext } from '@/src/utils/contexts/template';

export const TemplatePanelMainTab = () => {
  const templateContext = useTemplateContext();

  return (
    <>
      <Input
        className='max-w-xs'
        value={templateContext.name}
        onChange={(event) => templateContext.updateName(event.target.value)}
      />
      <div className='mt-3 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-2 py-1 text-sm text-amber-800 shadow-sm'>
        <span aria-hidden='true' className='inline-flex h-2.5 w-2.5 rounded-full bg-amber-500' />
        <p className='m-0'>
          Template can contain only one root component, drag and drop will accept more but we will
          ignore them
        </p>
      </div>
    </>
  );
};
