import { ComponentPanel, DragDropArea } from '@/app/templates/(components)';
import { postV1ScreenGet, postV1ScreenGetVersions } from '@/generated/api/admin/requests/bduiApi';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/src/components/ui';
import { ComponentsProvider } from '@/src/utils/contexts/components';
import { DragDropProvider } from '@/src/utils/contexts/dragDrop';
import { ScreenProvider } from '@/src/utils/contexts/screen';

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
  const version =
    postV1ScreenGetVersionsResponse.data.versions.find(
      (version) => version.version === searchParams.version
    ) ?? postV1ScreenGetVersionsResponse.data.versions[0];

  const postV1ScreenGetResponse = await postV1ScreenGet({
    data: { screenId: params.screenId, versionId: version.id }
  });

  return (
    <ScreenProvider
      initialApis={postV1ScreenGetResponse.screen.apis}
      initialName={postV1ScreenGetResponse.screen.screenName}
      action='update'
      initialScreenNavigationParams={postV1ScreenGetResponse.screen.screenNavigationParams ?? []}
      initialVersion={{ isProduction: version.isProduction, name: version.version }}
    >
      <ComponentsProvider action='create'>
        <DragDropProvider action='create'>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={20}>
              <div className='overflow-y-auto'>
                <ScreenPanel />
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
    </ScreenProvider>
  );
};

export default UpdateScreenPage;
