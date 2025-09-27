import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMutating } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';

import { usePostV1ApiSave, usePutV1ApiUpdate } from '@/generated/api/admin/requests/bduiApi';

import type { ExternalApiSchema } from '../constants/externalApiSchema';

import { externalApiSchema } from '../constants/externalApiSchema';

export type UseExternalApiFormParams =
  | {
      action: 'create';
    }
  | {
      action: 'update';
      defaultValues: ExternalApiSchema;
      apiId: string;
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
    const externalApiParams = values.params.map((value) => value.name);

    console.log('#values', values);
    if (params.action === 'update') {
      await usePutV1ApiUpdateMutation.mutateAsync({
        data: {
          data: {
            // TODO fix json schema
            api: {
              ...values,
              params: externalApiParams,
              ...(values.schema && { schema: JSON.parse(values.schema) })
            },
            apiId: params.apiId
          }
        }
      });

      return;
    }

    await usePostV1ApiSaveMutation.mutateAsync({
      data: {
        ...values,
        params: externalApiParams,
        ...(values.schema && { schema: JSON.parse(values.schema) })
      }
    });
  });

  const loading = !!mutating || !!externalApiForm.formState.isSubmitting;

  return {
    state: { loading },
    functions: { onSubmit },
    form: externalApiForm,
    fields: { paramsFieldArray, endpointsFieldArray }
  };
};
