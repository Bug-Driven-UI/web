import type { ViewUpdate } from '@uiw/react-codemirror';

import { diagnosticCount } from '@codemirror/lint';
import React from 'react';
import { toast } from 'sonner';

import type { Component } from '@/generated/api/admin/models';

import { JsonCodeEditor } from '@/src/components/code';
import { Button, SheetFooter } from '@/src/components/ui';
import { COMPONENT_JSON_SCHEMAS } from '@/src/utils/constants';
import { useDragDropContext } from '@/src/utils/contexts/dragDrop';
import { useTemplateContext } from '@/src/utils/contexts/template';

interface ComponentEditorProps {
  id: string;
  type: Component['type'];
}

export const ComponentEditor = ({ id, type }: ComponentEditorProps) => {
  const dragDropContext = useDragDropContext();
  const templateContext = useTemplateContext();
  const component = templateContext.getComponentById(id, type);
  const [value, setValue] = React.useState(() => {
    try {
      const stringifiedComponent = JSON.stringify(component, null, 2);
      return stringifiedComponent;
    } catch {
      toast.error('Invalid component schema');
      return '';
    }
  });

  const [hasErrors, setHasErrors] = React.useState(false);

  const schema = COMPONENT_JSON_SCHEMAS[type];

  const onChange = (viewUpdate: ViewUpdate) => setHasErrors(!!diagnosticCount(viewUpdate.state));

  const onSaveClick = () => {
    try {
      const parsedValue = JSON.parse(value);
      if (hasErrors) {
        toast.error(`JSON doesn't match schema for ${type} component`);
        return;
      }

      templateContext.updateComponentById(id, parsedValue);
      dragDropContext.updateActiveComponent(undefined);
    } catch {
      toast.error('Invalid JSON');
    }
  };

  return (
    <>
      <JsonCodeEditor
        className='flex-1 overflow-y-auto px-4'
        schema={schema}
        value={value}
        onChange={setValue}
        onUpdate={onChange}
      />
      <SheetFooter>
        <Button type='submit' onClick={onSaveClick}>
          Save changes
        </Button>
      </SheetFooter>
    </>
  );
};
