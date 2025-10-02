import type { Component } from '@/generated/api/admin/models';
import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { postV1TemplateGet } from '@/generated/api/admin/requests/bduiApi';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/src/components/ui';
import { ComponentsProvider } from '@/src/utils/contexts/components';
import { DragDropProvider } from '@/src/utils/contexts/dragDrop';
import { TemplateProvider } from '@/src/utils/contexts/template';
import { isCompositeComponent } from '@/src/utils/helpers';

import { ComponentPanel, DragDropArea, TemplatePanel } from '../(components)';

export const dynamic = 'force-dynamic';

interface TemplateUpdatePageProps {
  params: Promise<{ templateId: string }>;
}

const TemplateUpdatePage = async (props: TemplateUpdatePageProps) => {
  const params = await props.params;
  const postV1TemplateGetResponse = await postV1TemplateGet({ data: { id: params.templateId } });

  const template = postV1TemplateGetResponse.data.template;
  const initialTemplateComponents = new Map<string, Component>();

  const buildDragDropComponent = (component: Component): DragDropComponent => {
    initialTemplateComponents.set(component.id, component);

    if (component.type === 'stateful') {
      return {
        id: component.id,
        type: component.type,
        states: component.states.map((state) => ({
          id: crypto.randomUUID(),
          condition: state.condition,
          component: buildDragDropComponent(state.component)
        }))
      };
    }

    if (!isCompositeComponent(component)) {
      return {
        id: component.id,
        type: component.type
      };
    }

    return {
      id: component.id,
      type: component.type,
      children: component.children.map(buildDragDropComponent)
    };
  };

  const initialDragDropComponents: DragDropComponent[] = [
    buildDragDropComponent(template.component)
  ];

  return (
    <TemplateProvider initialName={template.name}>
      <ComponentsProvider action='update' initialComponents={initialTemplateComponents}>
        <DragDropProvider
          action='update'
          allowMultiple={false}
          initialComponents={initialDragDropComponents}
        >
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={20}>
              <div className='overflow-y-auto'>
                <TemplatePanel />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={75}>
              <div className='h-full overflow-y-auto'>
                <DragDropArea />
              </div>
            </ResizablePanel>
            <ComponentPanel />
          </ResizablePanelGroup>
        </DragDropProvider>
      </ComponentsProvider>
    </TemplateProvider>
  );
};

export default TemplateUpdatePage;
