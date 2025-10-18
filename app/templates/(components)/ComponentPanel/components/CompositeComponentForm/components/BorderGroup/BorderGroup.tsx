import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Typography
} from '@/src/components/ui';

import type { CompositeComponentSchema } from '../../constants/schema';

export const BorderGroup = () => {
  const formContext = useFormContext<CompositeComponentSchema>();

  return (
    <div className='border-border/60 space-y-3 rounded-lg border p-4 shadow-sm'>
      <Typography variant='small'>Border</Typography>
      <FormField
        render={({ field }) => (
          <FormItem>
            <FormLabel>Thickness (px)</FormLabel>
            <FormControl>
              <Input
                min={0}
                type='number'
                value={field.value}
                onChange={(event) => field.onChange(+event.target.value)}
                placeholder='1'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        name='border.thickness'
        control={formContext.control}
      />
      <FormField
        render={({ field }) => (
          <FormItem>
            <FormLabel>Color token</FormLabel>
            <FormControl>
              <Input
                min={0}
                type='number'
                value={field.value}
                onChange={(event) => field.onChange(+event.target.value)}
                placeholder='border.primary'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        name='border.color.token'
        control={formContext.control}
      />
    </div>
  );
};
