import { z } from 'zod';

const paramSchema = z.object({
  name: z.string().trim().min(1, 'Required field')
});

const apiSchema = z.object({
  apiAlias: z.string().min(1, 'Required field'),
  apiName: z.string().min(1, 'Required field'),
  apiParams: z.array(paramSchema)
});

export const commandSchema = z.object({
  name: z.string().min(1, 'Required field').trim(),
  itemTemplate: z.string().optional(),
  fallbackMessage: z.string().optional(),
  commandParams: z.array(paramSchema),
  apis: z.array(apiSchema)
});

export type CommandSchema = z.infer<typeof commandSchema>;
