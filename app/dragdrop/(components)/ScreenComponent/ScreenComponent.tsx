import { isCompositeComponent, isLeafComponent } from '@/app/dragdrop/types';

import type { ScreenCompositeComponentProps } from '../ScreenCompositeComponent/ScreenCompositeComponent';
import type { ScreenLeafComponentProps } from '../ScreenLeafComponent/ScreenLeafComponent';

import { ScreenCompositeComponent } from '../ScreenCompositeComponent/ScreenCompositeComponent';
import { ScreenLeafComponent } from '../ScreenLeafComponent/ScreenLeafComponent';

type ScreenComponentProps = ScreenCompositeComponentProps | ScreenLeafComponentProps;

const isCompositeComponentProps = (
  props: ScreenComponentProps
): props is ScreenCompositeComponentProps => isCompositeComponent(props.component);

const isLeafComponentProps = (props: ScreenComponentProps): props is ScreenLeafComponentProps =>
  isLeafComponent(props.component);

export const ScreenComponent = (props: ScreenComponentProps) => (
  <>
    {isCompositeComponentProps(props) && <ScreenCompositeComponent {...props} />}
    {isLeafComponentProps(props) && <ScreenLeafComponent {...props} />}
  </>
);
