import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { usePostV1TemplateGetByName } from '@/generated/api/admin/requests/bduiApi';
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

export const ItemsFieldsGroup = () => {
  const [open, setOpen] = React.useState(false);
  const formContext = useFormContext<CompositeComponentSchema>();
  const formItemTemplateName = formContext.watch('itemTemplateName');

  const usePostV1TemplateGetByNameMutation = usePostV1TemplateGetByName();
  const templates = usePostV1TemplateGetByNameMutation.isSuccess
    ? usePostV1TemplateGetByNameMutation.data.data.templates
    : [];

  React.useEffect(() => {
    usePostV1TemplateGetByNameMutation.mutate({ data: { data: { query: '' } } });
  }, []);

  return (
    <div className='border-border/60 grid gap-4 rounded-md border-1 p-4 md:grid-cols-2'>
      <FormField
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel className='block'>Template name</FormLabel>
            <FormControl>
              <Popover modal={false} onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                  <Button
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                    variant='outline'
                    role='combobox'
                  >
                    {formItemTemplateName || 'Select...'}
                    <ChevronsUpDownIcon className='opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='z-[10002] w-[200px] p-0'>
                  <Command>
                    <CommandInput className='h-9' placeholder='Search framework...' />
                    <CommandList>
                      <CommandEmpty>Not found.</CommandEmpty>
                      <CommandGroup>
                        {templates.map((template) => (
                          <CommandItem
                            key={template.id}
                            value={template.name}
                            onSelect={() => {
                              field.onChange(template.name);
                              setOpen(false);
                            }}
                          >
                            {template.name}
                            <CheckIcon
                              className={cn(
                                'ml-auto',
                                formItemTemplateName === template.name ? 'opacity-100' : 'opacity-0'
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
        name={'itemTemplateName'}
        control={formContext.control}
      />

      <FormField
        render={({ field }) => (
          <FormItem>
            <FormLabel>Item alias</FormLabel>
            <FormControl>
              <Input placeholder='alias' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        name='itemAlias'
        control={formContext.control}
      />

      <FormField
        render={({ field }) => (
          <FormItem>
            <FormLabel>Item Data expression</FormLabel>
            <FormControl>
              <Input placeholder='data' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        name='itemsData'
        control={formContext.control}
      />
    </div>
  );
};
