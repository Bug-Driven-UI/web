'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { TrashIcon } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { ScreenContextValue } from '@/src/utils/contexts/screen';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Typography
} from '@/src/components/ui';
import { useScreenContext } from '@/src/utils/contexts/screen';

import type { StatesSchema } from './constants/stateSchema';

import { statesSchema } from './constants/stateSchema';

export const ScreenPanelStatesTab = () => {
  const screenContext = useScreenContext();
  const form = useForm<StatesSchema>({
    resolver: zodResolver(statesSchema),
    mode: 'onSubmit',
    defaultValues: {
      states: Object.entries(screenContext.states).map(([key, value]) => ({ key, value })) ?? []
    }
  });

  const statesFieldArray = useFieldArray({
    control: form.control,
    name: 'states'
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log('#values', values);
    console.log(
      '#states',
      values.states.reduce(
        (acc, state) => {
          acc[state.key] = state.value;

          return acc;
        },
        {} as ScreenContextValue['states']
      )
    );
    screenContext.updateStates(
      values.states.reduce(
        (acc, state) => {
          acc[state.key] = state.value;

          return acc;
        },
        {} as ScreenContextValue['states']
      )
    );
    toast.success('Screen states updated locally');
  });

  return (
    <Form {...form}>
      <form className='h-[400px] space-y-6' onSubmit={onSubmit}>
        <Button className='w-40' type='submit'>
          Сохранить локально
        </Button>
        <div className='border-border bg-card space-y-2 rounded-lg border p-4 shadow-sm'>
          <Typography variant='large'>Screen states</Typography>
          <div className='space-y-6'>
            {statesFieldArray.fields.map((stateField, stateIndex) => (
              <div key={stateField.id}>
                <div className='flex gap-2'>
                  <FormField
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    name={`states.${stateIndex}.key`}
                    control={form.control}
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
                    name={`states.${stateIndex}.value`}
                    control={form.control}
                  />
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={() => statesFieldArray.remove(stateIndex)}
                  >
                    <TrashIcon />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button
            className='mt-2'
            type='button'
            variant='secondary'
            onClick={() => statesFieldArray.append({ key: '', value: '' })}
          >
            Add state
          </Button>
        </div>
      </form>
    </Form>
  );
};
