import {} from '@radix-ui/react-select';
import { useFormContext } from 'react-hook-form';

import {
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

import type { BaseComponentSchema } from '../../constants/schema';

interface SizeGroupProps {
  dimension: 'height' | 'width';
  label: string;
}

const SIZES = ['fixed', 'weighted', 'matchParent', 'wrapContent'];

export const SizeGroup = ({ dimension, label }: SizeGroupProps) => {
  const formContext = useFormContext<BaseComponentSchema>();

  return (
    <div className='border-border/60 space-y-3 rounded-lg border p-4 shadow-sm'>
      <Typography variant='small'>{label}</Typography>
      <div className='grid gap-3 md:grid-cols-2'>
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Behaviour</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select behaviour' />
                  </SelectTrigger>
                  <SelectContent>
                    {SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  <Input placeholder='Pixels for fixed size' {...field} />
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
                  <Input placeholder='Fraction for weighted size' {...field} />
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
