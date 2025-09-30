'use client';

import { Badge, Input } from '@/src/components/ui';
import { useTemplateContext } from '@/src/utils/contexts/template';

export const TemplatePanelMainTab = () => {
  const templateContext = useTemplateContext();

  return (
    <div className='flex flex-col gap-4'>
      <Input
        className='max-w-xs'
        value={templateContext.name}
        onChange={(event) => templateContext.updateName(event.target.value)}
      />
      <Badge variant='destructive'>
        Template can contain only one root component, drag and drop will accept more but we will
        ignore them
      </Badge>
    </div>
  );
};
