import type { Control } from 'react-hook-form';

import { TrashIcon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Typography
} from '@/src/components/ui';

import type { ScreenSchema } from '../ScreenPanelMainTab/screenSchema';

interface ApiParamsFieldArrayProps {
  apiIndex: number;
  control: Control<ScreenSchema>;
}

export const ApiParamsFieldArray = ({ control, apiIndex }: ApiParamsFieldArrayProps) => {
  const paramsFieldArray = useFieldArray({ control, name: `apis.${apiIndex}.params` });

  return (
    <div className='space-y-3'>
      {paramsFieldArray.fields.length === 0 && (
        <Typography variant='muted'>No parameters defined for this API.</Typography>
      )}
      {paramsFieldArray.fields.map((fieldItem, paramIndex) => (
        <div key={fieldItem.id} className='grid gap-4 md:grid-cols-3'>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parameter {paramIndex + 1}</FormLabel>
                <FormControl>
                  <Input placeholder='userId' {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={`apis.${apiIndex}.params.${paramIndex}.name`}
            control={control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder='{inputs.userId}'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={`apis.${apiIndex}.params.${paramIndex}.value`}
            control={control}
          />
          <div className='flex items-end'>
            <Button
              type='button'
              variant='destructive'
              onClick={() => paramsFieldArray.remove(paramIndex)}
            >
              <TrashIcon className='size-4' /> Remove
            </Button>
          </div>
        </div>
      ))}
      <Button
        type='button'
        variant='secondary'
        onClick={() => paramsFieldArray.append({ name: '', value: '' })}
      >
        Add API parameter
      </Button>
    </div>
  );
};
