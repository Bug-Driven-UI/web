'use client';

import { toast } from 'sonner';

import {
  usePostV1TemplateSave,
  usePutV1TemplateUpdate
} from '@/generated/api/admin/requests/bduiApi';
import { Button, Input } from '@/src/components/ui';
import { useTemplateContext } from '@/src/utils/contexts/template';

export const TemplatePanelMainTab = () => {
  const templateContext = useTemplateContext();
  const usePutV1TemplateUpdateMutation = usePutV1TemplateUpdate();
  const usePostV1TemplateSaveMutation = usePostV1TemplateSave();

  const onSaveClick = async () => {
    if (templateContext.action === 'create') {
      // todo
      await usePostV1TemplateSaveMutation.mutateAsync({ data: { name: templateContext.name } });

      toast.success('Template saved');
      return;
    }

    // todo
    await usePutV1TemplateUpdateMutation.mutateAsync({
      data: {
        data: { template: { name: templateContext.name } }
      }
    });
    toast.success('Template saved');
  };

  return (
    <div className='flex flex-col gap-4'>
      <Input
        value={templateContext.name}
        onChange={(event) => templateContext.updateName(event.target.value)}
      />
      <Button onClick={onSaveClick}>
        {templateContext.action === 'create' ? 'Создать шаблон' : ' Сохранить шаблон'}
      </Button>
    </div>
  );
};
