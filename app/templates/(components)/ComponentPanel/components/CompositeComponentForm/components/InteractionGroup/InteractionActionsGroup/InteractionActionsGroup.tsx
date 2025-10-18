import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/src/components/ui';

import type { CompositeComponentSchema } from '../../../constants/schema';

import { InteractionActionField } from './InteractionActionField';

interface InteractionActionsGroupProps {
  interactionIndex: number;
}

export const InteractionActionsGroup = ({ interactionIndex }: InteractionActionsGroupProps) => {
  const formContext = useFormContext<CompositeComponentSchema>();
  const actionsFieldArray = useFieldArray<
    CompositeComponentSchema,
    `interactions.${number}.actions`
  >({
    control: formContext.control,
    name: `interactions.${interactionIndex}.actions` as `interactions.${number}.actions`
  });

  return (
    <div className='space-y-3'>
      {actionsFieldArray.fields.map((actionField, actionIndex) => (
        <InteractionActionField
          key={actionField.id}
          actionIndex={actionIndex}
          interactionIndex={interactionIndex}
          onRemove={() => actionsFieldArray.remove(actionIndex)}
        />
      ))}
      <Button
        type='button'
        variant='secondary'
        onClick={() => actionsFieldArray.append({ type: 'command', name: '', params: [] })}
      >
        Add action
      </Button>
    </div>
  );
};
