import type { ViewUpdate } from '@uiw/react-codemirror';

import { diagnosticCount } from '@codemirror/lint';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMutating } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { usePostV1ApiSave, usePutV1ApiUpdate } from '@/generated/api/admin/requests/bduiApi';
import { ROUTES } from '@/src/utils/constants';

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

export const DEFAULT_EXTERNAL_API_VALUES: ExternalApiSchema = {
  name: '',
  description: '',
  params: [],
  endpoints: [],
  schema: undefined,
  mappingScript: undefined
};

export const useExternalApiForm = (params: UseExternalApiFormParams) => {
  const [schemaHasErrors, setSchemaHasErrors] = React.useState(false);
  const [mappingScriptHasErrors, setMappingScriptHasErrors] = React.useState(false);

  const router = useRouter();
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
    if (schemaHasErrors) {
      toast.error('Schema has errors');
      return;
    }
    if (mappingScriptHasErrors) {
      toast.error('Mapping script has errors');
      return;
    }
    try {
      if (values.schema) JSON.parse(values.schema);
    } catch {
      toast.error('Invalid json');
    }

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
      router.push(ROUTES.MAIN);
      params.onSuccessSubmit?.(values);

      return;
    }

    await usePostV1ApiSaveMutation.mutateAsync({ data: payload });
    router.push(ROUTES.MAIN);
    params.onSuccessSubmit?.(values);
  });

  const onSchemaUpdate = (viewUpdate: ViewUpdate) =>
    setSchemaHasErrors(!!diagnosticCount(viewUpdate.state));
  const onMappingScriptUpdate = (viewUpdate: ViewUpdate) =>
    setMappingScriptHasErrors(!!diagnosticCount(viewUpdate.state));

  const loading = !!mutating || !!externalApiForm.formState.isSubmitting;

  return {
    state: { loading },
    functions: { onSubmit, onSchemaUpdate, onMappingScriptUpdate },
    form: externalApiForm,
    fields: { paramsFieldArray, endpointsFieldArray }
  };
};
