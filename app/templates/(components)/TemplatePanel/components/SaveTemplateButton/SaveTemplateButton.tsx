'use client';

import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import {
  usePostV1TemplateSave,
  usePutV1TemplateUpdate
} from '@/generated/api/admin/requests/bduiApi';
import { Button } from '@/src/components/ui';
import { useComponentsContext } from '@/src/utils/contexts/components';
import { useTemplateContext } from '@/src/utils/contexts/template';

export const SaveTemplateButton = () => {
  const params = useParams<{ templateId: string }>();
  const templateContext = useTemplateContext();
  const componentsContext = useComponentsContext();

  const usePutV1TemplateUpdateMutation = usePutV1TemplateUpdate();
  const usePostV1TemplateSaveMutation = usePostV1TemplateSave();

  const onSaveClick = async () => {
    const [componentTree] = componentsContext.getComponentsTree();

    if (componentsContext.action === 'create') {
      await usePostV1TemplateSaveMutation.mutateAsync({
        data: { data: { template: { name: templateContext.name, component: componentTree } } }
      });

      toast.success('Template saved');
      return;
    }

    await usePutV1TemplateUpdateMutation.mutateAsync({
      data: {
        data: {
          id: params.templateId,
          template: {
            name: templateContext.name,
            component: componentTree
          }
        }
      }
    });
    toast.success('Template saved');
  };

  return <Button onClick={onSaveClick}>Сохранить шаблон на сервер</Button>;
};
