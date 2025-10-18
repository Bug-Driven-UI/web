import z from 'zod';

const insetsSchema = z.object({
  top: z.number(),
  bottom: z.number(),
  start: z.number(),
  end: z.number()
});

const sizeSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('fixed'),
    value: z.number()
  }),
  z.object({
    type: z.literal('weighted'),
    fraction: z.number()
  }),
  z.object({
    type: z.literal('matchParent')
  }),
  z.object({
    type: z.literal('wrapContent')
  })
]);

const borderSchema = z.object({
  thickness: z.number(),
  color: z.object({ token: z.string().optional() })
});

const shapeSchema = z.object({
  topLeft: z.number(),
  topRight: z.number(),
  bottomLeft: z.number(),
  bottomRight: z.number()
});

const actionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('command'),
    name: z.string('Required field').min(1, 'Required field'),
    params: z.array(
      z.object({ key: z.string('Required field'), value: z.string('Required field') })
    )
  }),
  z.object({
    type: z.literal('updateScreen'),
    screenName: z.string('Required field').min(1, 'Required field'),
    params: z.array(
      z.object({
        key: z.string('Required field').min(1, 'Required field'),
        value: z.string('Required field').min(1, 'Required field')
      })
    )
  }),
  z.object({
    type: z.literal('navigateTo'),
    screenName: z.string('Required field').min(1, 'Required field'),
    params: z.array(
      z.object({
        key: z.string('Required field').min(1, 'Required field'),
        value: z.string('Required field').min(1, 'Required field')
      })
    )
  }),
  z.object({
    type: z.literal('navigateBack'),
    updatePreviousScreen: z.boolean()
  }),
  z.object({
    type: z.literal('setLocalState'),
    target: z.string('Required field').min(1, 'Required field'),
    value: z.string('Required field').min(1, 'Required field')
  }),
  z.object({
    type: z.literal('setLocalStateFromInput'),
    target: z.string('Required field').min(1, 'Required field')
  }),
  z.object({
    type: z.literal('navigateToBottomSheet'),
    screenName: z.string('Required field').min(1, 'Required field'),
    params: z.array(
      z.object({
        key: z.string('Required field').min(1, 'Required field'),
        value: z.string('Required field').min(1, 'Required field')
      })
    )
  })
]);

const interactionSchema = z.object({
  type: z.enum(['onClick', 'onShow'], { message: 'Required field' }),
  actions: z.array(actionSchema)
});

const backgroundColorSchema = z.object({
  token: z.string().optional()
});

const arrangementSchema = z.discriminatedUnion('dimension', [
  z.object({
    dimension: z.literal('horizontal'),
    type: z
      .enum(['start', 'end', 'center', 'spaceBetween', 'spaceEvenly', 'spaceAround'])
      .optional()
  }),
  z.object({
    dimension: z.literal('vertical'),
    type: z
      .enum(['top', 'center', 'bottom', 'spaceBetween', 'spaceEvenly', 'spaceAround'])
      .optional()
  })
]);

const alignmentSchema = z.discriminatedUnion('dimension', [
  z.object({
    dimension: z.literal('horizontal'),
    type: z.enum(['start', 'center', 'end']).optional()
  }),
  z.object({
    dimension: z.literal('vertical'),
    type: z.enum(['top', 'center', 'bottom']).optional()
  }),
  z.object({
    dimension: z.literal('both'),
    type: z
      .enum([
        'topStart',
        'topCenter',
        'topEnd',
        'centerStart',
        'center',
        'centerEnd',
        'bottomStart',
        'bottomCenter',
        'bottomEnd'
      ])
      .optional()
  })
]);

export const compositeComponentSchema = z.object({
  id: z.string().min(1, 'Required field'),
  interactions: z.array(interactionSchema),
  paddings: insetsSchema.optional(),
  margins: insetsSchema.optional(),
  width: sizeSchema,
  height: sizeSchema,
  backgroundColor: backgroundColorSchema.optional(),
  border: borderSchema.optional(),
  shape: shapeSchema.optional(),
  isScrollable: z.boolean().optional(),
  arrangement: arrangementSchema.optional(),
  alignment: alignmentSchema.optional(),
  itemsData: z.string().optional(),
  itemAlias: z.string().optional(),
  itemTemplateName: z.string().optional()
});

export type CompositeComponentSchema = z.infer<typeof compositeComponentSchema>;
