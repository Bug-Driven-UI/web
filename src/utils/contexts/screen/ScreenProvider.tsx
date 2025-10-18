'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

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
      initialStates: ScreenContextValue['states'];
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

  const [states, setStates] = React.useState<ScreenContextValue['states']>(
    props.action === 'update' ? props.initialStates : {}
  );
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

  const getScreenPayload = () => {
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

    const componentsTree = dragDropContext.getComponentsTree();
    const topBar = componentsTree.find((component) => component.id === 'top-bar');
    const bottomBar = componentsTree.find((component) => component.id === 'bottom-bar');
    const filteredComponentsTree = componentsTree.filter(
      (component) => component.id !== 'top-bar' && component.id !== 'bottom-bar'
    );

    const screenPayload: ScreenForSave = {
      screenName: name,
      apis: sanitizedApis,
      components: filteredComponentsTree,
      scaffold: { bottomBar, topBar },
      screenNavigationParams: navigationParams ?? [],
      description: '',
      localStates: states
    };

    return screenPayload;
  };

  const saveScreen = React.useCallback(async () => {
    const postV1ScreenSaveResponse = await postV1ScreenSave.mutateAsync({
      data: getScreenPayload()
    });

    if (
      postV1ScreenSaveResponse.type === 'success' &&
      postV1ScreenSaveResponse.data.screen.version.id
    ) {
      if (postV1ScreenSaveResponse.type === 'success') {
        toast.success('New screen version created');
      }

      if (version.isProduction) {
        const postV1ScreenSetProductionVersionResponse =
          await postV1ScreenSetProductionVersion.mutateAsync({
            data: {
              data: {
                screenId: params.screenId,
                versionId: version.id
              }
            }
          });

        if (postV1ScreenSetProductionVersionResponse.type === 'success') {
          toast.success('Version is set to production');
        }
      }

      const newVersion = postV1ScreenSaveResponse.data.screen.version;

      setVersion({
        id: newVersion.id,
        isProduction: newVersion.isProduction,
        version: newVersion.version,
        createdAtTimestampMs: newVersion.createdAtTimestampMs
      });
      router.push(`${ROUTES.SCREENS.$ID(params.screenId)}?version=${newVersion.id}`);
    }
  }, [
    apis,
    dragDropContext,
    name,
    states,
    props.action,
    params.screenId,
    screenNavigationParams,
    version
  ]);

  const updateScreen = React.useCallback(async () => {
    const putV1ScreenUpdateResponse = await putV1ScreenUpdate.mutateAsync({
      data: {
        data: {
          screenId: params.screenId,
          versionId: version.id,
          screen: getScreenPayload()
        }
      }
    });

    if (putV1ScreenUpdateResponse.type === 'success') {
      toast.success('Screen updated');
    }

    if (version.isProduction) {
      const postV1ScreenSetProductionVersionResponse =
        await postV1ScreenSetProductionVersion.mutateAsync({
          data: {
            data: {
              screenId: params.screenId,
              versionId: version.id
            }
          }
        });

      if (postV1ScreenSetProductionVersionResponse.type === 'success') {
        toast.success('Version is set to production');
      }
    }
  }, [
    apis,
    dragDropContext,
    states,
    name,
    props.action,
    params.screenId,
    screenNavigationParams,
    version
  ]);

  const value = React.useMemo(
    () => ({
      apis,
      saveScreen,
      updateScreen,
      name,
      action: props.action,
      screenNavigationParams,
      version,
      updateVersion,
      versions: props.action === 'update' ? props.versions : [],
      updateApis,
      states,
      updateStates: setStates,
      updateName,
      updateScreenNavigationParams
    }),
    [
      apis,
      states,
      saveScreen,
      updateScreen,
      setStates,
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
