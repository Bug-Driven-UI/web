import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMutating } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  usePostV1ColorStyleSave,
  usePutV1ColorStyleUpdate
} from '@/generated/api/admin/requests/bduiApi';
import { ROUTES } from '@/src/utils/constants';

import type { ColorStyleSchema } from '../constants/colorStyleSchema';

import { colorStyleSchema } from '../constants/colorStyleSchema';

export type UseColorStyleFormParams =
  | {
      action: 'create';
      onSuccessSubmit?: () => void;
    }
  | {
      action: 'update';
      styleId: string;
      defaultValues: ColorStyleSchema;
      onSuccessSubmit?: () => void;
    };

const COLOR_STYLE_DEFAULT_VALUE: ColorStyleSchema = {
  token: '',
  color: '#9013FE'
};

export const useColorStyleForm = (params: UseColorStyleFormParams) => {
  const router = useRouter();
  const mutating = useIsMutating();

  const usePostV1ColorStyleSaveMutation = usePostV1ColorStyleSave();
  const usePutV1ColorStyleUpdateMutation = usePutV1ColorStyleUpdate();

  const colorStyleForm = useForm<ColorStyleSchema>({
    resolver: zodResolver(colorStyleSchema),
    mode: 'onSubmit',
    defaultValues: params.action === 'update' ? params.defaultValues : COLOR_STYLE_DEFAULT_VALUE
  });

  const onSubmit = colorStyleForm.handleSubmit(async (values) => {
    if (params.action === 'update') {
      await usePutV1ColorStyleUpdateMutation.mutateAsync({
        data: {
          data: {
            id: params.styleId,
            colorStyle: values
          }
        }
      });
      router.push(ROUTES.MAIN);
      params.onSuccessSubmit?.();

      return;
    }

    await usePostV1ColorStyleSaveMutation.mutateAsync({ data: { data: { colorStyle: values } } });
    router.push(ROUTES.MAIN);
    params.onSuccessSubmit?.();
  });

  const loading = !!mutating || !!colorStyleForm.formState.isSubmitting;

  return {
    state: { loading },
    form: colorStyleForm,
    functions: { onSubmit }
  };
};
