import { z } from 'zod';

import { TextDecorationType } from '@/generated/api/admin/models';

export type TextDecorationOption = (typeof TextDecorationType)[keyof typeof TextDecorationType];
export const textDecorationOptions = Object.values(TextDecorationType) as TextDecorationOption[];

export const textStyleSchema = z.object({
  token: z.string().trim().min(1, 'Required field'),
  size: z.number().min(1, 'Required field'),
  lineHeight: z.number().min(1, 'Required field'),
  weight: z.number().min(1, 'Required field'),
  decoration: z.enum(Object.values(TextDecorationType)).optional()
});

export type TextStyleSchema = z.infer<typeof textStyleSchema>;
