import z from 'zod';

export const statesSchema = z.object({
  states: z.array(
    z.object({
      key: z.string().min(1, 'Required field'),
      value: z.string().optional()
    })
  )
});

export type StatesSchema = z.infer<typeof statesSchema>;
