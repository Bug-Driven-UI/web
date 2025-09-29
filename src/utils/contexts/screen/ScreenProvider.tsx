'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import type { ScreenForSave } from '@/generated/api/admin/models';

import {
  postV1ScreenSave,
  postV1ScreenSetProductionVersion,
  putV1ScreenUpdate
} from '@/generated/api/admin/requests/bduiApi';

import type { ScreenContextValue } from './ScreenContext';

import { ROUTES } from '../../constants';
import { useComponentsContext } from '../components';
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
  const componentsContext = useComponentsContext();
  const params = useParams<{ screenId: string }>();

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
    props.action === 'update' ? props.initialVersion : { isProduction: false, name: 'v1' }
  );

  const updateApis = React.useCallback(
    (nextApis: ScreenContextValue['apis']) => setApis(nextApis),
    []
  );

  const updateName = React.useCallback(
    (nextName: ScreenContextValue['name']) => setName(nextName),
    []
  );
  const updateScreenNavigationParams = React.useCallback((values: string[]) => {
    setScreenNavigationParams(values);
  }, []);

  const updateVersion = React.useCallback(
    (nextVersion: ScreenContextValue['version']) => setVersion(nextVersion),
    []
  );

  const saveScreen = React.useCallback(async () => {
    try {
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
        components: componentsContext.getComponentsTree(),
        ...(navigationParams.length ? { screenNavigationParams: navigationParams } : {})
      };

      console.log('#screenPayload', screenPayload);
      if (props.action === 'update' && params.screenId) {
        await putV1ScreenUpdate({
          data: {
            screenId: params.screenId,
            // todo
            versionId: '',
            screen: screenPayload
          }
        });

        if (version.isProduction) {
          await postV1ScreenSetProductionVersion({
            data: {
              screenId: params.screenId,
              // todo
              versionId: ''
            }
          });
        }
        return;
      }

      if (props.action === 'create') {
        await postV1ScreenSave(screenPayload);
      }
      router.push(ROUTES.MAIN);
    } catch (error) {
      console.error('Failed to save screen', error);
      toast.error('Failed to save screen');
    }
  }, [
    apis,
    componentsContext,
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
      name,
      screenNavigationParams,
      version,
      versions: props.action === 'update' ? props.versions : [],
      updateApis,
      updateName,
      updateScreenNavigationParams,
      updateVersion
    }),
    [
      apis,
      name,
      screenNavigationParams,
      version,
      updateApis,
      updateName,
      updateScreenNavigationParams,
      updateVersion
    ]
  );

  return <ScreenContext value={value}>{props.children}</ScreenContext>;
};
