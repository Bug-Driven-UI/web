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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography
} from '@/src/components/ui';

import type { UseTextStyleFormParams } from './hooks/useTextStyleForm';

import { textDecorationOptions } from './constants/textStyleSchema';
import { useTextStyleForm } from './hooks/useTextStyleForm';

type TextStyleFormProps = UseTextStyleFormParams;

export const TextStyleForm = (props: TextStyleFormProps) => {
  const { state, form, functions } = useTextStyleForm(props);

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
            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(event) => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name='size'
                control={form.control}
              />
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(event) => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name='weight'
                control={form.control}
              />
            </div>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decoration</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        console.log('#value', value);
                        console.log('#field.value', field.value);
                        if (value === field.value) field.onChange(undefined);
                        else field.onChange(value);
                      }}
                    >
                      <SelectTrigger className='w-1/2'>
                        <SelectValue placeholder='Select decoration' />
                      </SelectTrigger>
                      <SelectContent>
                        {textDecorationOptions.map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            onClick={() => option === field.value && field.onChange(undefined)}
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='decoration'
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
