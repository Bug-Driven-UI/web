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

export const ShapeGroup = () => {
  const formContext = useFormContext<CompositeComponentSchema>();

  return (
    <div className='border-border/60 space-y-3 rounded-lg border p-4 shadow-sm'>
      <Typography variant='small'>Shape (border radius)</Typography>
      <div className='grid gap-3 md:grid-cols-2'>
        {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((corner) => (
          <FormField
            key={`shape.${corner}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>{corner}</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    type='number'
                    value={field.value}
                    onChange={(event) => field.onChange(+event.target.value)}
                    placeholder='Radius in px'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={`shape.${corner}`}
            control={formContext.control}
          />
        ))}
      </div>
    </div>
  );
};
