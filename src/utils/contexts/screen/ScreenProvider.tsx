'use client';

import React from 'react';

import type { ScreenContextValue } from './ScreenContext';

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

  const saveScreen = () => {
    // todo make save request
  };

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
