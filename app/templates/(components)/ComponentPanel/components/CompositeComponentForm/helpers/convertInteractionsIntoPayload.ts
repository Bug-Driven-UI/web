import type {
  CommandAction,
  Component,
  NavigateBackAction,
  NavigateToAction,
  NavigateToBottomSheetAction,
  SetLocalStateAction,
  SetLocalStateFromInputAction,
  UpdateScreenAction
} from '@/generated/api/admin/models';

import type { CompositeComponentSchema } from '../constants/schema';

export const convertInteractionsIntoPayload = (
  interactions: CompositeComponentSchema['interactions']
): Component['interactions'] =>
  interactions.map((interaction) => ({
    type: interaction.type,
    actions: interaction.actions.map((action) => {
      const params =
        'params' in action
          ? action.params.reduce((acc, param) => ({ ...acc, [param.key]: param.value }), {})
          : [];

      if (action.type === 'command') {
        return {
          type: 'command',
          name: action.name,
          params
        } satisfies CommandAction;
      }

      if (action.type === 'navigateBack') {
        return {
          type: 'navigateBack',
          updatePreviousScreen: action.updatePreviousScreen
        } satisfies NavigateBackAction;
      }

      if (
        action.type === 'navigateTo' ||
        action.type === 'updateScreen' ||
        action.type === 'navigateToBottomSheet'
      ) {
        return {
          type: action.type,
          screenName: action.screenName,
          screenNavigationParams: params
        } satisfies NavigateToAction | NavigateToBottomSheetAction | UpdateScreenAction;
      }

      if (action.type === 'setLocalState') {
        return {
          type: 'setLocalState',
          target: action.target,
          value: action.value
        } satisfies SetLocalStateAction;
      }

      return {
        type: 'setLocalStateFromInput',
        target: action.target
      } satisfies SetLocalStateFromInputAction;
    })
  }));
