'use client';

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

import type { UseColorStyleFormParams } from './hooks/useColorStyleForm';

import { ColorPicker } from './(components)';
import { useColorStyleForm } from './hooks/useColorStyleForm';

type ColorStyleFormProps = UseColorStyleFormParams;

export const ColorStyleForm = (props: ColorStyleFormProps) => {
  const { state, form, functions } = useColorStyleForm(props);

  return (
    <Form {...form}>
      <form onSubmit={functions.onSubmit}>
        <fieldset className='flex w-full flex-col gap-6' disabled={state.loading}>
          <div className='border-border bg-card space-y-4 rounded-lg border p-6 shadow-sm'>
            <Typography variant='large'>General Information</Typography>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input placeholder='text.primary' {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='token'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color (hex)</FormLabel>
                  <FormControl>
                    <ColorPicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='color'
              control={form.control}
            />

            <Button className='w-full self-end' size='lg' type='submit' loading={state.loading}>
              {props.action === 'update' ? 'Сохранить' : 'Создать'}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};
