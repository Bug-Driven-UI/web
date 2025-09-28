'use client';

import { Input } from '@/src/components/ui';
import { useTemplateContext } from '@/src/utils/contexts/template';

export const TemplatePanelMainTab = () => {
  const templateContext = useTemplateContext();

  return (
    <Input
      className='max-w-xs'
      value={templateContext.name}
      onChange={(event) => templateContext.updateName(event.target.value)}
    />
  );
};
