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
  console.log('## template', template);
  const initialTemplateComponents = new Map<string, Component>();
  const initialDragDropComponents: DragDropComponent[] = [
    {
      id: template.component.id,
      type: template.component.type,
      ...(isCompositeComponent(template.component) && { children: [] })
    }
  ];

  const buildMap = (component: Component, dragDropParent: DragDropComponent) => {
    initialTemplateComponents.set(component.id, component);

    if (!isCompositeComponent(component)) {
      dragDropParent.children?.push({ id: component.id, type: component.type });
      return;
    }

    component.children.forEach((child) => {
      dragDropParent.children?.push({
        id: child.id,
        type: child.type,
        children: []
      });
      buildMap(child, child);
    });
  };
  buildMap(template.component, initialDragDropComponents[0]);
  console.log('## initialTemplateComponents', initialTemplateComponents);
  console.log('## initialDragDropComponents ', initialDragDropComponents);
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
