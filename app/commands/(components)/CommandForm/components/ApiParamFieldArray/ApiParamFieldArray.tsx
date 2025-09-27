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
  const apiParamsFieldArray = useFieldArray({
    control: formContext.control,
    name: `apis.${apiFieldIndex}.apiParams`
  });

  return (
    <div className='space-y-3'>
      {apiParamsFieldArray.fields.map((fieldItem, apiParamIndex) => (
        <div key={fieldItem.id} className='grid gap-4 md:grid-cols-2'>
          <FormField
            key={fieldItem.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>API parameter {apiParamIndex + 1}</FormLabel>
                <div className='flex gap-4'>
                  <FormControl>
                    <Input placeholder='userId' {...field} value={field.value ?? ''} />
                  </FormControl>
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={() => apiParamsFieldArray.remove(apiParamIndex)}
                  >
                    <TrashIcon />
                    Remove
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
            name={`apis.${apiFieldIndex}.apiParams.${apiParamIndex}.name`}
            control={formContext.control}
          />
        </div>
      ))}
      <Button
        type='button'
        variant='secondary'
        onClick={() => apiParamsFieldArray.append({ name: '' })}
      >
        Add API parameter
      </Button>
    </div>
  );
};
