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

import type { UseBaseComponentFormParams } from './hooks/useBaseComponentForm';

import { InsetsGroup, SizeGroup } from './components';
import { useBaseComponentForm } from './hooks/useBaseComponentForm';

type BaseComponentFormProps = UseBaseComponentFormParams;

export const BaseComponentForm = (props: BaseComponentFormProps) => {
  const { form, functions, fields } = useBaseComponentForm(props);

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={functions.onSubmit}>
        <div className='grid gap-4 md:grid-cols-2'>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Component ID</FormLabel>
                <FormControl>
                  <Input placeholder='button-1' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='id'
            control={form.control}
          />

          <FormField
            render={({ field }) => (
              <FormItem className='md:col-span-2'>
                <FormLabel>Background color token</FormLabel>
                <FormControl>
                  <Input placeholder='primary.background' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='backgroundColor.token'
            control={form.control}
          />
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <SizeGroup label='Width settings' dimension='width' />
          <SizeGroup label='Height settings' dimension='height' />
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <InsetsGroup label='Margins' group='margins' />
          <InsetsGroup label='Paddings' group='paddings' />
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <div className='border-border/60 space-y-3 rounded-lg border p-4 shadow-sm'>
            <Typography variant='small'>Border</Typography>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thickness (px)</FormLabel>
                  <FormControl>
                    <Input placeholder='1' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='border.thickness'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color token</FormLabel>
                  <FormControl>
                    <Input placeholder='border.primary' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='border.color.token'
              control={form.control}
            />
          </div>

          <div className='border-border/60 space-y-3 rounded-lg border p-4 shadow-sm'>
            <Typography variant='small'>Shape (border radius)</Typography>
            <div className='grid gap-3 md:grid-cols-2'>
              {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((corner) => (
                <FormField
                  key={`shape.${corner}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='capitalize'>{corner}</FormLabel>
                      <FormControl>
                        <Input placeholder='Radius in px' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name={`shape.${corner}`}
                  control={form.control}
                />
              ))}
            </div>
          </div>
        </div>

        <div className='border-border/60 space-y-3 rounded-lg border p-4 shadow-sm'>
          <Typography variant='small'>Interactions</Typography>
          <div className='space-y-3'>
            {fields.interactionsFieldArray.fields.map((interaction, index) => (
              <div key={interaction.id} className='flex items-start gap-3'>
                <FormField
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Interaction type</FormLabel>
                      <FormControl>
                        <Input placeholder='onClick' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name={`interactions.${index}.type`}
                  control={form.control}
                />
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => fields.interactionsFieldArray.remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button
            type='button'
            variant='secondary'
            onClick={() => fields.interactionsFieldArray.append({ type: 'onShow', actions: [] })}
          >
            Add interaction
          </Button>
        </div>

        <div className='flex justify-end'>
          <Button type='submit'>Save base settings</Button>
        </div>
      </form>
    </Form>
  );
};
