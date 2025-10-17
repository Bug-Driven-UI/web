import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import type { Component } from '@/generated/api/admin/models';

import { useComponentsContext } from '@/src/utils/contexts/components';

import type { BaseComponentSchema } from '../constants/schema';

import { baseComponentSchema } from '../constants/schema';

export interface UseBaseComponentFormParams {
  componentId: string;
  componentType: Component['type'];
}

export const useBaseComponentForm = (params: UseBaseComponentFormParams) => {
  const componentsContext = useComponentsContext();
  const component = componentsContext.getComponentById(params.componentId, params.componentType);

  const form = useForm<BaseComponentSchema>({
    resolver: zodResolver(baseComponentSchema),
    defaultValues: component || {
      id: params.componentId,
      interactions: []
    },
    mode: 'onSubmit'
  });

  const interactionsFieldArray = useFieldArray({
    control: form.control,
    name: 'interactions'
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log('#values', values);
    // Submission will be implemented later when integration is ready
  });

  return { functions: { onSubmit }, form, fields: { interactionsFieldArray } };
};
