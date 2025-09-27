import { z } from 'zod';

export const colorStyleSchema = z.object({
  token: z.string().trim().min(1, 'Required field'),
  color: z
    .string()
    .trim()
    .min(1, 'Required field')
    .regex(/^#[0-9A-F]{3}(?:[0-9A-F]{3})?$/i, 'Invalid hex color')
});

export type ColorStyleSchema = z.infer<typeof colorStyleSchema>;
