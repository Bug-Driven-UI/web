import z from 'zod';

const insetsSchema = z.object({
  top: z.number().min(1, 'Required field'),
  bottom: z.number().min(1, 'Required field'),
  start: z.number().min(1, 'Required field'),
  end: z.number().min(1, 'Required field')
});

const sizeSchema = z.union([
  z.object({
    type: z.literal('fixed'),
    value: z.number().min(1, 'Required field')
  }),
  z.object({
    type: z.literal('weighted'),
    fraction: z.number().min(1, 'Required field')
  }),
  z.object({
    type: z.literal('matchParent')
  }),
  z.object({
    type: z.literal('wrapContent')
  })
]);

const borderSchema = z.object({
  thickness: z.number().min(1, 'Required field'),
  color: z.object({ token: z.string().min(1, 'Required field') })
});

const shapeSchema = z.object({
  topLeft: z.string().min(1, 'Required field'),
  topRight: z.string().min(1, 'Required field'),
  bottomLeft: z.string().min(1, 'Required field'),
  bottomRight: z.string().min(1, 'Required field')
});

const actionSchema = z.union([
  z.object({
    type: z.literal('command'),
    name: z.string().min(1, 'Required field'),
    // todo
    params: z.array(z.any())
  }),
  z.object({
    type: z.literal('updateScreen'),
    screenName: z.string().min(1, 'Required field'),
    // todo
    screenNavigationParams: z.array(z.any())
  }),
  z.object({
    type: z.literal('navigateBack')
  })
]);

const interactionSchema = z.object({
  type: z.enum(['onClick', 'onShow']),
  actions: z.array(actionSchema)
});

const backgroundColorSchema = z.object({
  token: z.string().min(1, 'Required field')
});

export const baseComponentSchema = z.object({
  id: z.string().min(1, 'Component id is required'),
  interactions: z.array(interactionSchema),
  paddings: insetsSchema.optional(),
  margins: insetsSchema.optional(),
  width: sizeSchema,
  height: sizeSchema,
  backgroundColor: backgroundColorSchema.optional(),
  border: borderSchema.optional(),
  shape: shapeSchema.optional()
});

export type BaseComponentSchema = z.infer<typeof baseComponentSchema>;
