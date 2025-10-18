import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { Size } from '@/generated/api/admin/models';

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
  PopoverTrigger,
  Typography
} from '@/src/components/ui';
import { cn } from '@/src/utils/helpers';

import type { CompositeComponentSchema } from '../../constants/schema';

interface SizeGroupProps {
  dimension: 'height' | 'width';
  label: string;
}

const SIZE_TYPES: Size['type'][] = ['fixed', 'weighted', 'matchParent', 'wrapContent'];

export const SizeGroup = ({ dimension, label }: SizeGroupProps) => {
  const [open, setOpen] = React.useState(false);
  const formContext = useFormContext<CompositeComponentSchema>();
  const formSizeType = formContext.watch(`${dimension}.type`);

  return (
    <div className='border-border/60 space-y-3 rounded-lg border p-4 shadow-sm'>
      <Typography variant='small'>{label}</Typography>
      <div className='flex flex-col gap-2'>
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover modal={false} onOpenChange={setOpen} open={open}>
                  <PopoverTrigger asChild>
                    <Button
                      aria-expanded={open}
                      className='w-[200px] justify-between'
                      variant='outline'
                      role='combobox'
                    >
                      {formSizeType || 'Select...'}
                      <ChevronsUpDownIcon className='opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='z-[10002] w-[200px] p-0'>
                    <Command>
                      <CommandInput className='h-9' placeholder='Search...' />
                      <CommandList>
                        <CommandEmpty>Not found.</CommandEmpty>
                        <CommandGroup>
                          {SIZE_TYPES.map((sizeType) => (
                            <CommandItem
                              key={sizeType}
                              value={sizeType}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue);
                                setOpen(false);
                              }}
                            >
                              {sizeType}
                              <CheckIcon
                                className={cn(
                                  'ml-auto',
                                  sizeType === formSizeType ? 'opacity-100' : 'opacity-0'
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
          name={`${dimension}.type`}
          control={formContext.control}
        />
        {formContext.watch(`${dimension}.type`) === 'fixed' && (
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={0}
                    min={0}
                    type='number'
                    value={field.value}
                    onChange={(event) => field.onChange(+event.target.value)}
                    placeholder='Value (px)'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={`${dimension}.value`}
            control={formContext.control}
          />
        )}
        {formContext.watch(`${dimension}.type`) === 'weighted' && (
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fraction</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={0}
                    min={0}
                    type='number'
                    value={field.value}
                    onChange={(event) => field.onChange(+event.target.value)}
                    placeholder='Weight (fraction)'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={`${dimension}.fraction`}
            control={formContext.control}
          />
        )}
      </div>
    </div>
  );
};
