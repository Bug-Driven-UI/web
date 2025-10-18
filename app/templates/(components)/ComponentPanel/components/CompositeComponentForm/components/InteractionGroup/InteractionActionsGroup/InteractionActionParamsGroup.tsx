import { TrashIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input
} from '@/src/components/ui';

import type { CompositeComponentSchema } from '../../../constants/schema';

interface InteractionActionParamsGroupProps {
  actionIndex: number;
  interactionIndex: number;
}

export const InteractionActionParamsGroup = ({
  interactionIndex,
  actionIndex
}: InteractionActionParamsGroupProps) => {
  const formContext = useFormContext<CompositeComponentSchema>();
  const paramsFieldArray = useFieldArray<
    CompositeComponentSchema,
    `interactions.${number}.actions.${number}.params`
  >({
    control: formContext.control,
    name: `interactions.${interactionIndex}.actions.${actionIndex}.params` as `interactions.${number}.actions.${number}.params`
  });

  return (
    <div className='mt-2 space-y-3'>
      {paramsFieldArray.fields.map((fieldItem, paramIndex) => (
        <div key={fieldItem.id} className='grid gap-4 md:grid-cols-3'>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='key' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={`interactions.${interactionIndex}.actions.${actionIndex}.params.${paramIndex}.key`}
            control={formContext.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='value' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={`interactions.${interactionIndex}.actions.${actionIndex}.params.${paramIndex}.value`}
            control={formContext.control}
          />

          <div className='flex items-end'>
            <Button
              type='button'
              variant='destructive'
              onClick={() => paramsFieldArray.remove(paramIndex)}
            >
              <TrashIcon />
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button
        type='button'
        variant='secondary'
        onClick={() => paramsFieldArray.append({ key: '', value: '' })}
      >
        Add param
      </Button>
    </div>
  );
};
