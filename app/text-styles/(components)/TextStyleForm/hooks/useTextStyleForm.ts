import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMutating } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  usePostV1TextStyleSave,
  usePutV1TextStyleUpdate
} from '@/generated/api/admin/requests/bduiApi';
import { ROUTES } from '@/src/utils/constants';

import type { TextStyleSchema } from '../constants/textStyleSchema';

import { textStyleSchema } from '../constants/textStyleSchema';

export type UseTextStyleFormParams =
  | {
      action: 'create';
      onSuccessSubmit?: () => void;
    }
  | {
      action: 'update';
      styleId: string;
      defaultValues: TextStyleSchema;
      onSuccessSubmit?: () => void;
    };

export const TEXT_STYLE_DEFAULT_VALUE: TextStyleSchema = {
  token: '',
  size: 16,
  weight: 400,
  lineHeight: 24
};

export const useTextStyleForm = (params: UseTextStyleFormParams) => {
  const router = useRouter();
  const mutating = useIsMutating();

  const usePostTextStyleSave = usePostV1TextStyleSave();
  const usePutTextStyleUpdate = usePutV1TextStyleUpdate();

  const textStyleForm = useForm<TextStyleSchema>({
    resolver: zodResolver(textStyleSchema),
    mode: 'onSubmit',
    defaultValues: params.action === 'update' ? params.defaultValues : TEXT_STYLE_DEFAULT_VALUE
  });

  const onSubmit = textStyleForm.handleSubmit(async (values) => {
    if (params.action === 'update') {
      await usePutTextStyleUpdate.mutateAsync({
        data: {
          data: {
            id: params.styleId,
            textStyle: values
          }
        }
      });
      router.push(ROUTES.MAIN);
      params.onSuccessSubmit?.();

      return;
    }

    await usePostTextStyleSave.mutateAsync({ data: { data: { textStyle: values } } });
    router.push(ROUTES.MAIN);
    params.onSuccessSubmit?.();
  });

  const loading = !!mutating || !!textStyleForm.formState.isSubmitting;

  return {
    state: { loading },
    form: textStyleForm,
    functions: { onSubmit }
  };
};
