import { CheckIcon, ChevronsUpDownIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { Action } from '@/generated/api/admin/models';

import {
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/src/components/ui';
import { cn } from '@/src/utils/helpers';

import type { CompositeComponentSchema } from '../../../constants/schema';

import { InteractionActionParamsGroup } from './InteractionActionParamsGroup';

interface InteractionActionFieldProps {
  actionIndex: number;
  interactionIndex: number;
  onRemove: () => void;
}

const ACTION_TYPES: Action['type'][] = [
  'command',
  'navigateBack',
  'navigateTo',
  'navigateToBottomSheet',
  'setLocalState',
  'setLocalStateFromInput',
  'updateScreen'
] as const;

export const InteractionActionField = ({
  actionIndex,
  interactionIndex,
  onRemove
}: InteractionActionFieldProps) => {
  const [open, setOpen] = React.useState(false);
  const formContext = useFormContext<CompositeComponentSchema>();
  const actionType = formContext.watch(
    `interactions.${interactionIndex}.actions.${actionIndex}.type`
  );

  return (
    <div className='border-border/60 flex flex-col gap-3 rounded-md border p-2'>
      <div className='flex justify-between'>
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel className='block'>Action {actionIndex + 1} </FormLabel>
              <FormControl>
                <Popover modal={false} onOpenChange={setOpen} open={open}>
                  <PopoverTrigger asChild>
                    <Button
                      aria-expanded={open}
                      className='w-[200px] justify-between'
                      variant='outline'
                      role='combobox'
                    >
                      {formContext.watch(
                        `interactions.${interactionIndex}.actions.${actionIndex}.type`
                      ) || 'Select...'}
                      <ChevronsUpDownIcon className='opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='z-[10002] w-[200px] p-0'>
                    <Command>
                      <CommandInput className='h-9' placeholder='Search...' />
                      <CommandList>
                        <CommandEmpty>Not found.</CommandEmpty>
                        <CommandGroup>
                          {ACTION_TYPES.map((actionType) => (
                            <CommandItem
                              key={actionType}
                              value={actionType}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue);
                                setOpen(false);
                              }}
                            >
                              {actionType}
                              <CheckIcon
                                className={cn(
                                  'ml-auto',
                                  formContext.watch(
                                    `interactions.${interactionIndex}.actions.${actionIndex}.type`
                                  ) === actionType
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={`interactions.${interactionIndex}.actions.${actionIndex}.type`}
          control={formContext.control}
        />
        <Button type='button' variant='destructive' onClick={onRemove}>
          <TrashIcon />
          Remove
        </Button>
      </div>

      {actionType === 'command' && (
        <FormField
          render={({ field }) => (
            <FormItem className={cn(`md:col-span-2`)}>
              <FormLabel>Command name</FormLabel>
              <FormControl>
                <Input placeholder='commandName' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={`interactions.${interactionIndex}.actions.${actionIndex}.name`}
          control={formContext.control}
        />
      )}

      {(actionType === 'setLocalState' || actionType === 'setLocalStateFromInput') && (
        <FormField
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel>Target</FormLabel>
              <FormControl>
                <Input placeholder='state name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={`interactions.${interactionIndex}.actions.${actionIndex}.target`}
          control={formContext.control}
        />
      )}

      {actionType === 'navigateBack' && (
        <FormField
          render={({ field }) => (
            <FormItem className='flex items-center gap-2'>
              <FormControl>
                <Checkbox checked={field.value} className='m-0' onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className=''>Update previous screen</FormLabel>
              <FormMessage />
            </FormItem>
          )}
          name={`interactions.${interactionIndex}.actions.${actionIndex}.updatePreviousScreen`}
          control={formContext.control}
        />
      )}

      {actionType === 'setLocalState' && (
        <FormField
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder='value' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={`interactions.${interactionIndex}.actions.${actionIndex}.value`}
          control={formContext.control}
        />
      )}

      {(actionType === 'navigateTo' ||
        actionType === 'updateScreen' ||
        actionType === 'navigateToBottomSheet') && (
        <FormField
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel>Screen name</FormLabel>
              <FormControl>
                <Input placeholder='screenName' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={`interactions.${interactionIndex}.actions.${actionIndex}.screenName`}
          control={formContext.control}
        />
      )}

      {(actionType === 'command' ||
        actionType === 'updateScreen' ||
        actionType === 'navigateTo' ||
        actionType === 'navigateToBottomSheet') && (
        <InteractionActionParamsGroup
          actionIndex={actionIndex}
          interactionIndex={interactionIndex}
        />
      )}
    </div>
  );
};
