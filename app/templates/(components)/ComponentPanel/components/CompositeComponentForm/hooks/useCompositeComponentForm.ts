import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type {
  Box,
  Column,
  Component,
  CompositeBase,
  DynamicColumn,
  DynamicRow,
  Row
} from '@/generated/api/admin/models';

import { useComponentsContext } from '@/src/utils/contexts/components';
import { useDragDropContext } from '@/src/utils/contexts/dragDrop';

import type { CompositeComponentSchema } from '../constants/schema';

import { compositeComponentSchema } from '../constants/schema';
import { convertInteractionsIntoPayload } from '../helpers/convertInteractionsIntoPayload';

export interface UseCompositeComponentFormParams {
  componentId: string;
  componentType: Component['type'];
}

export const useCompositeComponentForm = (params: UseCompositeComponentFormParams) => {
  const componentsContext = useComponentsContext();
  const dragDropContext = useDragDropContext();
  const component = componentsContext.getComponentById(params.componentId, params.componentType);

  const form = useForm<CompositeComponentSchema>({
    resolver: zodResolver(compositeComponentSchema),
    defaultValues: {
      backgroundColor: { token: component.backgroundColor?.token ?? '' },
      ...(component.type === 'box' && {
        alignment: {
          dimension: 'both',
          ...(component.contentAlignment?.type && {
            type: component.contentAlignment.type
          })
        }
      }),
      ...(component.type === 'row' && { isScrollable: component.isScrollable ?? false }),
      ...((component.type === 'row' || component.type === 'dynamicRow') && {
        arrangement: {
          dimension: 'horizontal',
          ...(component.horizontalArrangement?.type && {
            type: component.horizontalArrangement.type
          })
        },
        alignment: {
          dimension: 'vertical',
          ...(component.verticalAlignment?.type && {
            type: component.verticalAlignment.type
          })
        }
      }),
      ...((component.type === 'column' || component.type === 'dynamicColumn') && {
        arrangement: {
          dimension: 'vertical',
          ...(component.verticalArrangement?.type && {
            type: component.verticalArrangement.type
          })
        },
        alignment: {
          dimension: 'horizontal',
          ...(component.horizontalAlignment?.type && {
            type: component.horizontalAlignment.type
          })
        }
      }),
      border: {
        color: { token: component.border?.color.token },
        thickness: component.border?.thickness ?? 0
      },
      height: {
        type: component.height.type ?? 'wrapContent',
        ...(component.height.type === 'fixed' && { value: component.height.value ?? 100 }),
        ...(component.height.type === 'weighted' && { value: component.height.fraction ?? 1 })
      },
      width: {
        type: component.width.type ?? 'wrapContent',
        ...(component.width.type === 'fixed' && { value: component.width.value ?? 100 }),
        ...(component.width.type === 'weighted' && { value: component.width.fraction ?? 1 })
      },
      id: component.id,
      interactions: component.interactions.map((interaction) => ({
        type: interaction.type,
        actions: interaction.actions.map((action) => ({
          type: action.type,
          ...(action.type === 'navigateBack' && {
            updatePreviousScreen: action.updatePreviousScreen
          }),
          ...(action.type === 'command' && {
            name: action.name,
            params: Object.entries(action.params ?? {}).map(([key, value]) => ({
              key,
              value: String(value)
            }))
          }),
          ...((action.type === 'navigateTo' ||
            action.type === 'updateScreen' ||
            action.type === 'navigateToBottomSheet') && {
            screenName: action.screenName,
            params: Object.entries(action.screenNavigationParams ?? {}).map(([key, value]) => ({
              key,
              value: String(value)
            }))
          }),
          ...(action.type === 'setLocalState' && {
            target: action.target,
            value: String(action.value)
          }),
          ...(action.type === 'setLocalStateFromInput' && {
            target: action.target
          })
        }))
      })),
      margins: {
        bottom: component.margins?.bottom ?? 0,
        end: component.margins?.end ?? 0,
        start: component.margins?.start ?? 0,
        top: component.margins?.top ?? 0
      },
      paddings: {
        bottom: component.paddings?.bottom ?? 0,
        end: component.paddings?.end ?? 0,
        start: component.paddings?.start ?? 0,
        top: component.paddings?.top ?? 0
      },
      shape: {
        bottomLeft: component.shape?.bottomLeft ?? 0,
        bottomRight: component.shape?.bottomRight ?? 0,
        topLeft: component.shape?.topLeft ?? 0,
        topRight: component.shape?.topRight ?? 0
      },
      ...((component.type === 'dynamicColumn' || component.type === 'dynamicRow') && {
        itemAlias: component.itemAlias,
        itemsData: component.itemsData,
        itemTemplateName: component.itemTemplateName
      })
    },
    mode: 'onSubmit'
  });

  const interactionsFieldArray = useFieldArray({
    control: form.control,
    name: 'interactions'
  });

  React.useEffect(() => {
    console.log('## errors', form.formState.errors);
    console.log('## form.getValues', form.getValues());
  }, [form.formState.errors]);

  const onSubmit = form.handleSubmit((values) => {
    console.log('## values', values);

    const componentPayload: CompositeBase = {
      children: [],
      id: values.id,
      type: component.type,
      interactions: convertInteractionsIntoPayload(values.interactions),
      paddings: values.paddings,
      margins: values.margins,
      width: values.width,
      height: values.height,
      ...(values.backgroundColor?.token && {
        backgroundColor: { token: values.backgroundColor?.token }
      }),
      ...(values.border?.color.token &&
        values.border?.thickness && {
          border: {
            thickness: values.border.thickness,
            color: { token: values.border.color.token }
          }
        }),
      ...(values.shape && { shape: { type: 'roundedCorners', ...values.shape } }),
      ...(values.isScrollable && { isScrollable: values.isScrollable })
    };

    if (
      component.type === 'row' &&
      values.alignment?.dimension === 'vertical' &&
      values.arrangement?.dimension === 'horizontal'
    ) {
      const component: Row = {
        ...componentPayload,
        type: 'row',
        ...(values.alignment.type && { verticalAlignment: { type: values.alignment.type } }),
        ...(values.arrangement.type && { horizontalArrangement: { type: values.arrangement.type } })
      };
      componentsContext.updateComponentById(params.componentId, component);
      toast.success('Component updated locally');
      dragDropContext.updateActiveComponent(undefined);
    }

    if (
      component.type === 'dynamicRow' &&
      values.alignment?.dimension === 'vertical' &&
      values.arrangement?.dimension === 'horizontal'
    ) {
      if (!values.itemAlias) {
        form.setError('itemAlias', { type: 'required' });
        return;
      }
      if (!values.itemsData) {
        form.setError('itemsData', { type: 'required' });
        return;
      }
      if (!values.itemTemplateName) {
        form.setError('itemTemplateName', { type: 'required' });
        return;
      }
      const component: DynamicRow = {
        ...componentPayload,
        type: 'dynamicRow',
        itemAlias: values.itemAlias,
        itemsData: values.itemsData,
        itemTemplateName: values.itemTemplateName,
        ...(values.alignment.type && { verticalAlignment: { type: values.alignment.type } }),
        ...(values.arrangement.type && { horizontalArrangement: { type: values.arrangement.type } })
      };
      componentsContext.updateComponentById(params.componentId, component);
      toast.success('Component updated locally');
      dragDropContext.updateActiveComponent(undefined);
    }

    if (
      component.type === 'column' &&
      values.alignment?.dimension === 'horizontal' &&
      values.arrangement?.dimension === 'vertical'
    ) {
      const component: Column = {
        ...componentPayload,
        type: 'column',
        ...(values.alignment.type && { horizontalAlignment: { type: values.alignment.type } }),
        ...(values.arrangement.type && { verticalArrangement: { type: values.arrangement.type } })
      };
      componentsContext.updateComponentById(params.componentId, component);
      toast.success('Component updated locally');
      dragDropContext.updateActiveComponent(undefined);
    }

    if (
      component.type === 'dynamicColumn' &&
      values.alignment?.dimension === 'horizontal' &&
      values.arrangement?.dimension === 'vertical'
    ) {
      if (!values.itemAlias) {
        form.setError('itemAlias', { type: 'required' });
        return;
      }
      if (!values.itemsData) {
        form.setError('itemsData', { type: 'required' });
        return;
      }
      if (!values.itemTemplateName) {
        form.setError('itemTemplateName', { type: 'required' });
        return;
      }
      const component: DynamicColumn = {
        ...componentPayload,
        type: 'dynamicColumn',
        itemAlias: values.itemAlias,
        itemsData: values.itemsData,
        itemTemplateName: values.itemTemplateName,
        ...(values.alignment.type && { horizontalAlignment: { type: values.alignment.type } }),
        ...(values.arrangement.type && { verticalArrangement: { type: values.arrangement.type } })
      };
      componentsContext.updateComponentById(params.componentId, component);
      toast.success('Component updated locally');
      dragDropContext.updateActiveComponent(undefined);
    }

    if (component.type === 'box' && values.alignment?.dimension === 'both') {
      const component: Box = {
        ...componentPayload,
        type: 'box',
        ...(values.alignment.type && { contentAlignment: { type: values.alignment.type } })
      };

      componentsContext.updateComponentById(params.componentId, component);
      toast.success('Component updated locally');
      dragDropContext.updateActiveComponent(undefined);
    }
  });

  return { functions: { onSubmit }, form, fields: { interactionsFieldArray } };
};
