import z from 'zod';

export const screenSchema = z.object({
  name: z.string().min(1, 'Required field'),
  versionName: z.string().min(1, 'Required field'),
  isProduction: z.boolean(),
  navigationParams: z.array(z.object({ name: z.string().min(1, 'Required field') })),
  apis: z.array(
    z.object({
      alias: z.string().min(1, 'Required field'),
      id: z.string().min(1, 'Required field'),
      params: z.array(
        z.object({
          name: z.string().min(1, 'Required field'),
          value: z.string().min(1, 'Required field')
        })
      )
    })
  )
});

export type ScreenSchema = z.infer<typeof screenSchema>;
