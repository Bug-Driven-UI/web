import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { usePostV1ColorStyleGetByToken } from '@/generated/api/admin/requests/bduiApi';
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

export const BackgroundColorGroup = () => {
  const [open, setOpen] = React.useState(false);
  const formContext = useFormContext<CompositeComponentSchema>();
  const backgroundColorToken = formContext.watch('backgroundColor.token');

  const usePostV1ColorStyleGetByTokenMutation = usePostV1ColorStyleGetByToken({ mutation: {} });
  const colorStyles = usePostV1ColorStyleGetByTokenMutation.isSuccess
    ? usePostV1ColorStyleGetByTokenMutation.data.data.colorStyles
    : [];

  React.useEffect(() => {
    usePostV1ColorStyleGetByTokenMutation.mutate({ data: { data: { query: '' } } });
  }, []);

  return (
    <FormField
      render={({ field }) => (
        <FormItem className='md:col-span-2'>
          <FormLabel className='block'>Background color token</FormLabel>
          <FormControl>
            <Popover modal={false} onOpenChange={setOpen} open={open}>
              <PopoverTrigger asChild>
                <Button
                  aria-expanded={open}
                  className='w-[200px] justify-between'
                  variant='outline'
                  role='combobox'
                >
                  {backgroundColorToken || 'Select...'}
                  <ChevronsUpDownIcon className='opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='z-[10002] w-[200px] p-0'>
                <Command>
                  <CommandInput className='h-9' placeholder='Search...' />
                  <CommandList>
                    <CommandEmpty>Not found.</CommandEmpty>
                    <CommandGroup>
                      {colorStyles.map((colorStyle) => (
                        <CommandItem
                          key={colorStyle.id}
                          value={colorStyle.id}
                          onSelect={() => {
                            if (backgroundColorToken === colorStyle.token) {
                              field.onChange(undefined);
                            } else {
                              field.onChange(colorStyle.token);
                            }
                            setOpen(false);
                          }}
                        >
                          {colorStyle.token}
                          <CheckIcon
                            className={cn(
                              'ml-auto',
                              backgroundColorToken === colorStyle.token
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
      name='backgroundColor.token'
      control={formContext.control}
    />
  );
};
