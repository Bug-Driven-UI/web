import { CheckIcon, ChevronsUpDownIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { InteractionType } from '@/generated/api/admin/models';

import {
  Button,
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
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/src/components/ui';
import { cn } from '@/src/utils/helpers';

import type { CompositeComponentSchema } from '../../constants/schema';

import { InteractionActionsGroup } from './InteractionActionsGroup/InteractionActionsGroup';

interface InteractionGroupProps {
  interactionIndex: number;
  onRemove: () => void;
}

const INTERACTION_TYPES: InteractionType[] = ['onClick', 'onShow'];

export const InteractionGroup = ({ interactionIndex, onRemove }: InteractionGroupProps) => {
  const [open, setOpen] = React.useState(false);
  const formContext = useFormContext<CompositeComponentSchema>();

  return (
    <div className='border-border rounded-md border-2 p-2'>
      <div className='flex items-start gap-3 space-y-4'>
        <FormField
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel className='block'>Interaction {interactionIndex + 1}</FormLabel>
              <FormControl>
                <Popover modal={false} onOpenChange={setOpen} open={open}>
                  <PopoverTrigger asChild>
                    <Button
                      aria-expanded={open}
                      className='w-[200px] justify-between'
                      variant='outline'
                      role='combobox'
                    >
                      {formContext.watch(`interactions.${interactionIndex}.type`) || 'Select...'}
                      <ChevronsUpDownIcon className='opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='z-[10002] w-[200px] p-0'>
                    <Command>
                      <CommandInput className='h-9' placeholder='Search framework...' />
                      <CommandList>
                        <CommandEmpty>Not found.</CommandEmpty>
                        <CommandGroup>
                          {INTERACTION_TYPES.map((interactionType) => (
                            <CommandItem
                              key={interactionType}
                              value={interactionType}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue);
                                setOpen(false);
                              }}
                            >
                              {interactionType}
                              <CheckIcon
                                className={cn(
                                  'ml-auto',
                                  formContext.watch(`interactions.${interactionIndex}.type`) ===
                                    interactionType
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
          name={`interactions.${interactionIndex}.type`}
          control={formContext.control}
        />
        <Button type='button' variant='destructive' onClick={onRemove}>
          <TrashIcon />
          Remove
        </Button>
      </div>
      <InteractionActionsGroup interactionIndex={interactionIndex} />
    </div>
  );
};
