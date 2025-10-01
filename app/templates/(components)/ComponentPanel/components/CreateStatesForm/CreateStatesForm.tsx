import { TrashIcon } from 'lucide-react';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Typography
} from '@/src/components/ui';

import type { UseCreateStatesFormParams } from './hooks/useCreateStatesForm';

import { useCreateStatesForm } from './hooks/useCreateStatesForm';

type CreateStatesFormProps = UseCreateStatesFormParams;

export const CreateStatesForm = (props: CreateStatesFormProps) => {
  const { functions, form, fields } = useCreateStatesForm(props);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={functions.onSubmit}>
          <div className='border-border bg-card flex-1 space-y-4 rounded-lg border p-6 shadow-sm'>
            <Typography variant='large'>Conditions</Typography>
            <div className='space-y-3'>
              {fields.statesFieldArray.fields.map((fieldItem, index) => (
                <div key={fieldItem.id}>
                  <FormField
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition {index + 1}</FormLabel>
                        <div className='flex gap-2'>
                          <FormControl>
                            <Input placeholder='{}' {...field} value={field.value ?? ''} />
                          </FormControl>
                          <Button
                            type='button'
                            variant='destructive'
                            onClick={() => fields.statesFieldArray.remove(index)}
                          >
                            <TrashIcon />
                            Remove
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                    name={`states.${index}.condition`}
                    control={form.control}
                  />
                </div>
              ))}
            </div>
            <Button
              type='button'
              variant='secondary'
              onClick={() =>
                fields.statesFieldArray.append({ condition: '', id: crypto.randomUUID() })
              }
            >
              Add parameter
            </Button>
          </div>

          <Button className='float-right mt-5 w-40' size='lg' type='submit'>
            Сохранить локально
          </Button>
        </form>
      </Form>
    </div>
  );
};
