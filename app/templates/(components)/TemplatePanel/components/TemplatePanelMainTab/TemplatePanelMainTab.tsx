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
        Шаблон может содержать только один корневой компонент, drag&drop позволит вам добавить
        больше элементов, но при создании шаблона мы возьмем только первый рутовый элемент
      </Badge>
    </div>
  );
};
