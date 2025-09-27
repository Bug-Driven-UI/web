import { z } from 'zod';

const paramSchema = z.object({
  name: z.string().trim().min(1, 'Required field')
});

const apiParamSchema = z.object({
  name: z.string().trim().min(1, 'Required field'),
  value: z.string().trim().min(1, 'Required field')
});

const apiSchema = z.object({
  alias: z.string().trim().min(1, 'Required field'),
  id: z.string().trim().min(1, 'Required field'),
  params: z.array(apiParamSchema)
});

export const commandSchema = z.object({
  name: z.string().trim().min(1, 'Required field'),
  itemTemplateId: z.string().optional(),
  fallbackMessage: z.string().optional(),
  params: z.array(paramSchema),
  apis: z.array(apiSchema)
});

export type CommandSchema = z.infer<typeof commandSchema>;
