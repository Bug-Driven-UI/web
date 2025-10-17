'use client';

import React from 'react';

import { usePostV1ScreenRenderById } from '@/generated/api/engine/requests/bduiApi';
import { Typography } from '@/src/components/ui';

import { PreviewModeComponents } from './PreviewModeComponents';

interface PreviewModeProps {
  screenId: string;
  versionId: string;
}

export const PreviewMode = ({ screenId, versionId }: PreviewModeProps) => {
  const usePostV1ScreenRenderByIdMutation = usePostV1ScreenRenderById();

  React.useEffect(() => {
    const render = async () => {
      await usePostV1ScreenRenderByIdMutation.mutateAsync({
        data: {
          data: {
            screenId,
            versionId
          }
        }
      });
    };

    render();
  }, []);

  if (usePostV1ScreenRenderByIdMutation.isPending) {
    return (
      <div>
        <Typography className='pt-[4px]'>Working on it...</Typography>
      </div>
    );
  }

  if (
    usePostV1ScreenRenderByIdMutation.isSuccess &&
    'screen' in usePostV1ScreenRenderByIdMutation.data
  ) {
    return <PreviewModeComponents screen={usePostV1ScreenRenderByIdMutation.data.screen} />;
  }

  return (
    <div>
      <Typography className='pt-[4px]'>Working on it...</Typography>
    </div>
  );
};
