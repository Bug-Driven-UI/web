import type { Component } from '@/generated/api/admin/models';
import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { ComponentPanel, DragDropArea } from '@/app/templates/(components)';
import { postV1ScreenGet, postV1ScreenGetVersions } from '@/generated/api/admin/requests/bduiApi';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/src/components/ui';
import { ComponentsProvider } from '@/src/utils/contexts/components';
import { DragDropProvider } from '@/src/utils/contexts/dragDrop';
import { ScreenProvider } from '@/src/utils/contexts/screen';
import { isCompositeComponent } from '@/src/utils/helpers';

import { ScreenPanel } from '../(components)';

export const dynamic = 'force-dynamic';

interface UpdateScreenPageProps {
  params: Promise<{ screenId: string }>;
  searchParams: Promise<{ version?: string }>;
}

const UpdateScreenPage = async (props: UpdateScreenPageProps) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const postV1ScreenGetVersionsResponse = await postV1ScreenGetVersions({
    data: { screenId: params.screenId }
  });
  const prodVersion = postV1ScreenGetVersionsResponse.data.versions.find(
    (version) => version.isProduction
  );
  const version =
    postV1ScreenGetVersionsResponse.data.versions.find(
      (version) => version.id === searchParams.version
    ) ??
    prodVersion ??
    postV1ScreenGetVersionsResponse.data.versions[0];

  const postV1ScreenGetResponse = await postV1ScreenGet({
    data: { screenId: params.screenId, versionId: version.id }
  });
  const screen = postV1ScreenGetResponse.data.screen;

  const initialScreenComponents = new Map<string, Component>();
  const buildDragDropComponent = (component: Component): DragDropComponent => {
    initialScreenComponents.set(component.id, component);

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

  const initialDragDropComponents: DragDropComponent[] = [];

  if (screen.scaffold?.topBar) {
    initialDragDropComponents.push(buildDragDropComponent(screen.scaffold.topBar));
  }
  initialDragDropComponents.push(...screen.components.map(buildDragDropComponent));
  if (screen.scaffold?.bottomBar) {
    initialDragDropComponents.push(buildDragDropComponent(screen.scaffold.bottomBar));
  }

  return (
    <ComponentsProvider action='update' initialComponents={initialScreenComponents}>
      <DragDropProvider action='update' initialComponents={initialDragDropComponents}>
        <ScreenProvider
          initialApis={screen.apis}
          initialName={screen.screenName}
          action='update'
          initialScreenNavigationParams={screen.screenNavigationParams ?? []}
          initialVersion={{ isProduction: version.isProduction, name: version.version }}
          versions={postV1ScreenGetVersionsResponse.data.versions}
        >
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={35}>
              <div className='overflow-y-auto'>
                <ScreenPanel />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={65}>
              <div className='h-full overflow-y-auto'>
                <DragDropArea />
              </div>
            </ResizablePanel>
            <ComponentPanel />
          </ResizablePanelGroup>
        </ScreenProvider>
      </DragDropProvider>
    </ComponentsProvider>
  );
};

export default UpdateScreenPage;
