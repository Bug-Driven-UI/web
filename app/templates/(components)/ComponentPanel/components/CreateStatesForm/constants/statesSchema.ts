import { z } from 'zod';

export const statesSchema = z.object({
  states: z.array(
    z.object({
      condition: z.string().trim().min(1, 'Required field'),
      id: z.string().min(1, 'Required field')
    })
  )
});

export type StatesSchema = z.infer<typeof statesSchema>;
