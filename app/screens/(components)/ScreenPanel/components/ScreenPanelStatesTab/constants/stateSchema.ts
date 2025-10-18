import z from 'zod';

export const statesSchema = z.object({
  states: z.array(
    z.object({
      key: z.string().min(1, 'Required field'),
      value: z.string().min(1, 'Required field')
    })
  )
});

export type StatesSchema = z.infer<typeof statesSchema>;
