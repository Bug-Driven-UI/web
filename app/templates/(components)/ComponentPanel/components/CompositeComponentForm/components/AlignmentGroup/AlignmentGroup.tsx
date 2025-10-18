import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type {
  HorizontalAlignment,
  HorizontalAndVerticalAlignment,
  VerticalAlignment
} from '@/generated/api/admin/models';

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

interface AlignmentGroupProps {
  componentType: 'box' | 'column' | 'row';
}

const ALIGNMENT_TYPES = {
  row: ['top', 'center', 'bottom'] satisfies VerticalAlignment['type'][],
  column: ['start', 'center', 'end'] satisfies HorizontalAlignment['type'][],
  box: [
    'topStart',
    'topCenter',
    'topEnd',
    'centerStart',
    'center',
    'centerEnd',
    'bottomStart',
    'bottomCenter',
    'bottomEnd'
  ] satisfies HorizontalAndVerticalAlignment['type'][]
};

export const AlignmentGroup = ({ componentType }: AlignmentGroupProps) => {
  const [open, setOpen] = React.useState(false);
  const formContext = useFormContext<CompositeComponentSchema>();
  const formAlignmentType = formContext.watch('alignment.type');

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
        name='alignment.dimension'
        control={formContext.control}
      />
      <FormField
        render={({ field }) => (
          <FormItem className='md:col-span-2'>
            <FormLabel className='block'>Alignment (alt dimension)</FormLabel>
            <FormControl>
              <Popover modal={false} onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                  <Button
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                    variant='outline'
                    role='combobox'
                  >
                    {formAlignmentType || 'Select...'}
                    <ChevronsUpDownIcon className='opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='z-[10002] w-[200px] p-0'>
                  <Command>
                    <CommandInput className='h-9' placeholder='Search framework...' />
                    <CommandList>
                      <CommandEmpty>Not found.</CommandEmpty>
                      <CommandGroup>
                        {ALIGNMENT_TYPES[componentType].map((alignmentType) => (
                          <CommandItem
                            key={alignmentType}
                            value={alignmentType}
                            onSelect={() => {
                              if (formAlignmentType === alignmentType) {
                                field.onChange(undefined);
                              } else {
                                field.onChange(alignmentType);
                              }
                              setOpen(false);
                            }}
                          >
                            {alignmentType}
                            <CheckIcon
                              className={cn(
                                'ml-auto',
                                formAlignmentType === alignmentType ? 'opacity-100' : 'opacity-0'
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
        name='alignment.type'
        control={formContext.control}
      />
    </div>
  );
};
