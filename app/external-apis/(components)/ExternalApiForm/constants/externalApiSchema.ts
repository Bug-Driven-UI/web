import { z } from 'zod';

const endpointSchema = z.object({
  url: z.string().min(1, 'Required field'),
  method: z.string().trim().min(1, 'Required field'),
  responseName: z.string().trim().min(1, 'Required field'),
  timeoutMs: z.number().min(1, 'Required field'),
  isRequired: z.boolean()
});

const paramSchema = z.object({
  name: z.string().trim().min(1, 'Required field')
});

export const externalApiSchema = z.object({
  name: z.string().trim().min(1, 'Required field'),
  description: z.string().trim().min(1, 'Required field'),
  params: z.array(paramSchema),
  endpoints: z.array(endpointSchema),
  schema: z.string().optional(),
  mappingScript: z.string().optional()
});

export type ExternalApiSchema = z.infer<typeof externalApiSchema>;
