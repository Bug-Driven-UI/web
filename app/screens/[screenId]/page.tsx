import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import type { Component } from '@/generated/api/admin/models';
import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { PreviewMode } from '@/app/(components)';
import { ComponentPanel, DragDropArea } from '@/app/templates/(components)';
import { postV1ScreenGet, postV1ScreenGetVersions } from '@/generated/api/admin/requests/bduiApi';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/src/components/ui';
import { COOKIE_KEYS } from '@/src/utils/constants';
import { ComponentsProvider } from '@/src/utils/contexts/components';
import { DragDropProvider } from '@/src/utils/contexts/dragDrop';
import { ScreenProvider } from '@/src/utils/contexts/screen';
import { isCompositeComponent } from '@/src/utils/helpers';

import { ScreenPanel } from '../(components)';
import { SCREEN_PANEL_TABS } from '../constants';

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

  const initialVersion =
    postV1ScreenGetVersionsResponse.data.versions.find(
      (version) => version.id === searchParams.version
    ) ?? postV1ScreenGetVersionsResponse.data.versions.at(-1);

  if (!initialVersion) {
    return notFound();
  }

  const postV1ScreenGetResponse = await postV1ScreenGet({
    data: { screenId: params.screenId, versionId: initialVersion.id }
  });
  const screen = postV1ScreenGetResponse.data.screen;

  const initialScreenComponents = new Map<string, Component>();
  const buildDragDropComponent = (component: Component): DragDropComponent => {
    initialScreenComponents.set(component.id, component);

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

  const initialDragDropComponents: DragDropComponent[] = [];

  if (screen.scaffold?.topBar) {
    initialDragDropComponents.push(buildDragDropComponent(screen.scaffold.topBar));
  }
  initialDragDropComponents.push(...screen.components.map(buildDragDropComponent));
  if (screen.scaffold?.bottomBar) {
    initialDragDropComponents.push(buildDragDropComponent(screen.scaffold.bottomBar));
  }

  const cookieStore = await cookies();
  const tab = cookieStore.get(COOKIE_KEYS.SCREEN_TAB)?.value ?? SCREEN_PANEL_TABS.MAIN;

  return (
    <ComponentsProvider action='update' initialComponents={initialScreenComponents}>
      <DragDropProvider action='update' initialComponents={initialDragDropComponents}>
        <ScreenProvider
          initialApis={screen.apis}
          initialName={screen.screenName}
          action='update'
          initialScreenNavigationParams={screen.screenNavigationParams ?? []}
          initialVersion={initialVersion}
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
                {tab === SCREEN_PANEL_TABS.PREVIEW && (
                  <PreviewMode screenId={screen.screenId} versionId={initialVersion.id} />
                )}
                {tab !== SCREEN_PANEL_TABS.PREVIEW && <DragDropArea />}
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
