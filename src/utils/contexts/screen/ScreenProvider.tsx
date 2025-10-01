'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import type { ScreenForSave } from '@/generated/api/admin/models';

import {
  usePostV1ScreenSave,
  usePostV1ScreenSetProductionVersion,
  usePutV1ScreenUpdate
} from '@/generated/api/admin/requests/bduiApi';

import type { ScreenContextValue } from './ScreenContext';

import { ROUTES } from '../../constants';
import { useDragDropContext } from '../dragDrop';
import { ScreenContext } from './ScreenContext';

type ScreenProviderProps =
  | {
      action: 'create';
      children: React.ReactNode;
    }
  | {
      action: 'update';
      children: React.ReactNode;
      versions: ScreenContextValue['versions'];
      initialApis: ScreenContextValue['apis'];
      initialName: ScreenContextValue['name'];
      initialScreenNavigationParams: ScreenContextValue['screenNavigationParams'];
      initialVersion: ScreenContextValue['version'];
    };

export const ScreenProvider = (props: ScreenProviderProps) => {
  const router = useRouter();
  const dragDropContext = useDragDropContext();
  const params = useParams<{ screenId: string }>();

  const postV1ScreenSave = usePostV1ScreenSave();
  const postV1ScreenSetProductionVersion = usePostV1ScreenSetProductionVersion();
  const putV1ScreenUpdate = usePutV1ScreenUpdate();

  const [apis, setApis] = React.useState<ScreenContextValue['apis']>(
    props.action === 'update' ? props.initialApis : []
  );
  const [name, setName] = React.useState<ScreenContextValue['name']>(
    props.action === 'update' ? props.initialName : 'Untitled screen'
  );
  const [screenNavigationParams, setScreenNavigationParams] = React.useState<
    ScreenContextValue['screenNavigationParams']
  >(props.action === 'update' ? props.initialScreenNavigationParams : []);
  const [version, setVersion] = React.useState<ScreenContextValue['version']>(
    props.action === 'update'
      ? props.initialVersion
      : { id: '', isProduction: false, version: 0, createdAtTimestampMs: 0 }
  );

  const updateApis = React.useCallback(
    (nextApis: ScreenContextValue['apis']) => setApis(nextApis),
    []
  );
  const updateVersion = React.useCallback(
    (isProduction: boolean) => setVersion((prevVersion) => ({ ...prevVersion, isProduction })),
    []
  );
  const updateName = React.useCallback(
    (nextName: ScreenContextValue['name']) => setName(nextName),
    []
  );
  const updateScreenNavigationParams = React.useCallback((values: string[]) => {
    setScreenNavigationParams(values);
  }, []);

  const saveScreen = React.useCallback(async () => {
    const navigationParams = screenNavigationParams.map((param) => param.trim()).filter(Boolean);
    const sanitizedApis = apis
      .filter((api) => api.id && api.alias)
      .map((api) => ({
        id: api.id,
        alias: api.alias,
        params: (api.params ?? []).map((param) => ({
          name: param.name,
          value: param.value
        }))
      }));

    const screenPayload: ScreenForSave = {
      screenName: name,
      apis: sanitizedApis,
      components: dragDropContext.getComponentsTree(),
      screenNavigationParams: navigationParams ?? [],
      description: ''
    };
    console.log('## screenPayload', screenPayload);
    if (props.action === 'update' && params.screenId) {
      await putV1ScreenUpdate.mutateAsync({
        data: {
          data: {
            screenId: params.screenId,
            versionId: version.id,
            screen: screenPayload
          }
        }
      });

      if (version.isProduction) {
        await postV1ScreenSetProductionVersion.mutateAsync({
          data: {
            data: {
              screenId: params.screenId,
              versionId: version.id
            }
          }
        });
      }
      return;
    }

    if (props.action === 'create') {
      await postV1ScreenSave.mutateAsync({ data: screenPayload });
    }

    router.push(ROUTES.MAIN);
  }, [apis, dragDropContext, name, props.action, params.screenId, screenNavigationParams, version]);

  const value = React.useMemo(
    () => ({
      apis,
      saveScreen,
      name,
      screenNavigationParams,
      version,
      updateVersion,
      versions: props.action === 'update' ? props.versions : [],
      updateApis,
      updateName,
      updateScreenNavigationParams
    }),
    [
      apis,
      saveScreen,
      version,
      name,
      screenNavigationParams,
      updateApis,
      updateName,
      updateScreenNavigationParams
    ]
  );

  return <ScreenContext value={value}>{props.children}</ScreenContext>;
};
