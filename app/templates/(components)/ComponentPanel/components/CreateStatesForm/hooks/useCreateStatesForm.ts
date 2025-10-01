import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { useDragDropContext } from '@/src/utils/contexts/dragDrop';

import type { StatesSchema } from '../constants/statesSchema';

import { statesSchema } from '../constants/statesSchema';

export interface UseCreateStatesFormParams {
  activeComponent: DragDropComponent;
}

export const useCreateStatesForm = (params: UseCreateStatesFormParams) => {
  const dragDropContext = useDragDropContext();
  const statesForm = useForm<StatesSchema>({
    resolver: zodResolver(statesSchema),
    mode: 'onSubmit',
    defaultValues: {
      states:
        params.activeComponent.states?.map((state) => ({
          condition: state.condition,
          id: state.id
        })) ?? []
    }
  });

  const statesFieldArray = useFieldArray({
    control: statesForm.control,
    name: 'states'
  });

  const onSubmit = statesForm.handleSubmit(async (values) => {
    dragDropContext.updateStateConditions(params.activeComponent.id, values.states);
    toast.success('States saved');
  });

  return { functions: { onSubmit }, form: statesForm, fields: { statesFieldArray } };
};
