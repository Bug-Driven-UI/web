import { TrashIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@/src/components/ui';

import type { CommandSchema } from '../../constants/commandSchema';

interface ApiParamFieldArrayProps {
  apiFieldIndex: number;
}

export const ApiParamFieldArray = ({ apiFieldIndex }: ApiParamFieldArrayProps) => {
  const formContext = useFormContext<CommandSchema>();
  const apiParamsFieldArray = useFieldArray<CommandSchema, `apis.${number}.params`>({
    control: formContext.control,
    name: `apis.${apiFieldIndex}.params` as `apis.${number}.params`
  });

  return (
    <div className='space-y-3'>
      {apiParamsFieldArray.fields.map((fieldItem, apiParamIndex) => (
        <div key={fieldItem.id} className='grid gap-4 md:grid-cols-3'>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>API parameter {apiParamIndex + 1}</FormLabel>
                <FormControl>
                  <Input placeholder='userId' {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={`apis.${apiFieldIndex}.params.${apiParamIndex}.name`}
            control={formContext.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input placeholder='{{ inputs.userId }}' {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={`apis.${apiFieldIndex}.params.${apiParamIndex}.value`}
            control={formContext.control}
          />
          <div className='flex items-end'>
            <Button
              type='button'
              variant='destructive'
              onClick={() => apiParamsFieldArray.remove(apiParamIndex)}
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
        onClick={() => apiParamsFieldArray.append({ name: '', value: '' })}
      >
        Add API parameter
      </Button>
    </div>
  );
};
