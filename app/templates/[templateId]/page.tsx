import { notFound } from 'next/navigation';

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
  if (!postV1TemplateGetResponse.command) {
    return notFound();
  }

  const template = postV1TemplateGetResponse.command;
  const initialTemplateComponents = new Map<string, Component>();

  const buildDragDropComponent = (component: Component): DragDropComponent => {
    initialTemplateComponents.set(component.id, component);

    if (!isCompositeComponent(component)) {
      return {
        id: component.id,
        type: component.type
      };
    }

    return {
      id: component.id,
      type: component.type,
      children: component.children.map((child) => buildDragDropComponent(child))
    };
  };

  const initialDragDropComponents: DragDropComponent[] = [
    buildDragDropComponent(template.component)
  ];

  return (
    <TemplateProvider initialName={template.name}>
      <DragDropProvider
        action='update'
        allowMultiple={false}
        initialComponents={initialDragDropComponents}
      >
        <ComponentsProvider action='update' initialComponents={initialTemplateComponents}>
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
        </ComponentsProvider>
      </DragDropProvider>
    </TemplateProvider>
  );
};

export default TemplateUpdatePage;
