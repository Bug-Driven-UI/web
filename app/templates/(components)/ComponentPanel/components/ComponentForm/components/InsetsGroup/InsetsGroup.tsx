import { useFormContext } from 'react-hook-form';

import type { Insets } from '@/generated/api/admin/models';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Typography
} from '@/src/components/ui';

import type { BaseComponentSchema } from '../../constants/schema';

interface InsetsGroupProps {
  group: 'margins' | 'paddings';
  label: string;
}

const INSETS: (keyof Insets)[] = ['top', 'bottom', 'start', 'end'];

export const InsetsGroup = ({ group, label }: InsetsGroupProps) => {
  const formContext = useFormContext<BaseComponentSchema>();

  return (
    <div className='border-border/60 space-y-3 rounded-lg border p-4 shadow-sm'>
      <Typography variant='small'>{label}</Typography>
      <div className='grid grid-cols-2 gap-3'>
        {INSETS.map((inset) => (
          <FormField
            key={`${group}.${inset}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>{inset}</FormLabel>
                <FormControl>
                  <Input placeholder='Value in px' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={`${group}.${inset}`}
            control={formContext.control}
          />
        ))}
      </div>
    </div>
  );
};
