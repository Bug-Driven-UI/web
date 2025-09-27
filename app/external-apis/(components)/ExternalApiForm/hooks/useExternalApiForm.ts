import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMutating } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';

import { usePostV1ApiSave, usePutV1ApiUpdate } from '@/generated/api/admin/requests/bduiApi';

import type { ExternalApiSchema } from '../constants/externalApiSchema';

import { externalApiSchema } from '../constants/externalApiSchema';

export type UseExternalApiFormParams =
  | {
      action: 'create';
      onSuccessSubmit?: (values: ExternalApiSchema) => void;
    }
  | {
      action: 'update';
      defaultValues: ExternalApiSchema;
      apiId: string;
      onSuccessSubmit?: (values: ExternalApiSchema) => void;
    };

const DEFAULT_EXTERNAL_API_VALUES: ExternalApiSchema = {
  name: '',
  description: '',
  params: [],
  endpoints: [],
  schema: undefined,
  mappingScript: undefined
};

export const useExternalApiForm = (params: UseExternalApiFormParams) => {
  const mutating = useIsMutating();
  const usePostV1ApiSaveMutation = usePostV1ApiSave();
  const usePutV1ApiUpdateMutation = usePutV1ApiUpdate();

  const externalApiForm = useForm<ExternalApiSchema>({
    resolver: zodResolver(externalApiSchema),
    mode: 'onSubmit',
    defaultValues: params.action === 'update' ? params.defaultValues : DEFAULT_EXTERNAL_API_VALUES
  });

  const paramsFieldArray = useFieldArray({ control: externalApiForm.control, name: 'params' });
  const endpointsFieldArray = useFieldArray({
    control: externalApiForm.control,
    name: 'endpoints'
  });

  const onSubmit = externalApiForm.handleSubmit(async (values) => {
    const payload = {
      ...values,
      params: values.params.map((value) => value.name),
      ...(values.schema && { schema: JSON.parse(values.schema) })
    };

    if (params.action === 'update') {
      await usePutV1ApiUpdateMutation.mutateAsync({
        data: {
          data: {
            api: payload,
            apiId: params.apiId
          }
        }
      });
      params.onSuccessSubmit?.(values);

      return;
    }

    await usePostV1ApiSaveMutation.mutateAsync({ data: payload });

    params.onSuccessSubmit?.(values);
  });

  const loading = !!mutating || !!externalApiForm.formState.isSubmitting;

  return {
    state: { loading },
    functions: { onSubmit },
    form: externalApiForm,
    fields: { paramsFieldArray, endpointsFieldArray }
  };
};
