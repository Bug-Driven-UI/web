import { z } from 'zod';

export const colorStyleSchema = z.object({
  token: z.string().trim().min(1, 'Required field'),
  color: z.string().trim().min(1, 'Required field')
});

export type ColorStyleSchema = z.infer<typeof colorStyleSchema>;
