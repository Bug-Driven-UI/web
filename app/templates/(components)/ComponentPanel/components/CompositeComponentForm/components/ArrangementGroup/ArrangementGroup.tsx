import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { HorizontalArrangement, VerticalArrangement } from '@/generated/api/admin/models';

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
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/src/components/ui';
import { cn } from '@/src/utils/helpers';

import type { CompositeComponentSchema } from '../../constants/schema';

interface ArrangementGroupProps {
  componentType: 'column' | 'row';
}

const ARRANGEMENT_TYPES = {
  row: [
    'start',
    'end',
    'center',
    'spaceBetween',
    'spaceEvenly',
    'spaceAround'
  ] satisfies HorizontalArrangement['type'][],
  column: [
    'top',
    'center',
    'bottom',
    'spaceBetween',
    'spaceEvenly',
    'spaceAround'
  ] satisfies VerticalArrangement['type'][]
};

export const ArrangementGroup = ({ componentType }: ArrangementGroupProps) => {
  const [open, setOpen] = React.useState(false);
  const formContext = useFormContext<CompositeComponentSchema>();
  const formArrangementType = formContext.watch('arrangement.type');

  return (
    <div className='border-border/60 rounded-lg border p-4 shadow-sm'>
      <FormField
        render={({ field }) => (
          <FormItem className='hidden'>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
        name='arrangement.dimension'
        control={formContext.control}
      />
      <FormField
        render={({ field }) => (
          <FormItem className='md:col-span-2'>
            <FormLabel className='block'>Arrangement (main dimension)</FormLabel>
            <FormControl>
              <Popover modal={false} onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                  <Button
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                    variant='outline'
                    role='combobox'
                  >
                    {formArrangementType || 'Select...'}
                    <ChevronsUpDownIcon className='opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='z-[10002] w-[200px] p-0'>
                  <Command>
                    <CommandInput className='h-9' placeholder='Search...' />
                    <CommandList>
                      <CommandEmpty>Not found.</CommandEmpty>
                      <CommandGroup>
                        {ARRANGEMENT_TYPES[componentType].map((arrangementType) => (
                          <CommandItem
                            key={arrangementType}
                            value={arrangementType}
                            onSelect={() => {
                              if (formArrangementType === arrangementType) {
                                field.onChange(undefined);
                              } else {
                                field.onChange(arrangementType);
                              }
                              setOpen(false);
                            }}
                          >
                            {arrangementType}
                            <CheckIcon
                              className={cn(
                                'ml-auto',
                                formArrangementType === arrangementType
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
        name='arrangement.type'
        control={formContext.control}
      />
    </div>
  );
};
