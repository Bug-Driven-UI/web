'use client';

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Typography
} from '@/src/components/ui';

import type { UseCompositeComponentFormParams } from './hooks/useCompositeComponentForm';

import {
  AlignmentGroup,
  ArrangementGroup,
  BackgroundColorGroup,
  BorderGroup,
  InsetsGroup,
  InteractionGroup,
  ItemsFieldsGroup,
  ShapeGroup,
  SizeGroup
} from './components';
import { useCompositeComponentForm } from './hooks/useCompositeComponentForm';

interface BaseComponentFormProps extends UseCompositeComponentFormParams {}

export const CompositeComponentForm = (props: BaseComponentFormProps) => {
  const { form, functions, fields } = useCompositeComponentForm(props);

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

          <BackgroundColorGroup />

          {props.componentType === 'row' && (
            <FormField
              render={({ field }) => (
                <FormItem className='flex items-center gap-2'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      className='m-0'
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Scrollable row</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
              name='isScrollable'
              control={form.control}
            />
          )}
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <SizeGroup label='Width settings' dimension='width' />
          <SizeGroup label='Height settings' dimension='height' />
        </div>

        {(props.componentType === 'dynamicColumn' || props.componentType === 'dynamicRow') && (
          <ItemsFieldsGroup />
        )}

        <div className='grid gap-4 md:grid-cols-2'>
          <InsetsGroup label='Margins' group='margins' />
          <InsetsGroup label='Paddings' group='paddings' />
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <BorderGroup />
          <ShapeGroup />
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          {props.componentType === 'box' && (
            <>
              <AlignmentGroup componentType='box' />
            </>
          )}
          {(props.componentType === 'row' || props.componentType === 'dynamicRow') && (
            <>
              <ArrangementGroup componentType='row' />
              <AlignmentGroup componentType='row' />
            </>
          )}
          {(props.componentType === 'column' || props.componentType === 'dynamicColumn') && (
            <>
              <ArrangementGroup componentType='column' />
              <AlignmentGroup componentType='column' />
            </>
          )}
        </div>

        <div className='border-border/60 space-y-3 rounded-lg border p-4 shadow-sm'>
          <Typography variant='small'>Interactions</Typography>
          <div className='space-y-3'>
            {fields.interactionsFieldArray.fields.map((interaction, interactionIndex) => (
              <InteractionGroup
                key={interaction.id}
                interactionIndex={interactionIndex}
                onRemove={() => fields.interactionsFieldArray.remove(interactionIndex)}
              />
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

        <Button className='w-full' type='submit'>
          Сохранить локально
        </Button>
      </form>
    </Form>
  );
};
