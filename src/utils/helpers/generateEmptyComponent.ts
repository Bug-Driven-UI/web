import type {
  Box,
  Button,
  Column,
  Component,
  DynamicColumn,
  DynamicRow,
  Image,
  Input,
  ProgressBar,
  Row,
  Size,
  Spacer,
  StatefulComponent,
  Switch as SwitchComponent,
  Text
} from '@/generated/api/admin/models';

interface GenerateEmptyComponentParams {
  id: string;
  type: Component['type'];
}

const createSize = (type: Size['type']): Size => ({ type }) as Size;

const wrapContentSize = () => createSize('wrapContent');
const matchParentSize = () => createSize('matchParent');

const createImageComponent = (id: string): Image => {
  const image: Image = {
    id,
    type: 'image',
    interactions: [],
    width: matchParentSize(),
    height: wrapContentSize(),
    imageUrl: ''
  };

  return image;
};

const createBoxComponent = (id: string): Box => {
  const box: Box = {
    id,
    type: 'box',
    interactions: [],
    width: matchParentSize(),
    height: wrapContentSize(),
    children: []
  };

  return box;
};

const createRowComponent = (id: string): Row => {
  const row: Row = {
    id,
    type: 'row',
    interactions: [],
    width: matchParentSize(),
    height: wrapContentSize(),
    children: []
  };

  return row;
};

const createColumnComponent = (id: string): Column => {
  const column: Column = {
    id,
    type: 'column',
    interactions: [],
    width: matchParentSize(),
    height: wrapContentSize(),
    children: []
  };

  return column;
};

const createTextComponent = (id: string): Text => {
  const text: Text = {
    id,
    type: 'text',
    interactions: [],
    width: wrapContentSize(),
    height: wrapContentSize(),
    text: '',
    textStyle: { token: '' },
    colorStyle: { token: '' }
  };

  return text;
};

const createInputComponent = (id: string): Input => {
  const input: Input = {
    id,
    type: 'input',
    interactions: [],
    width: matchParentSize(),
    height: wrapContentSize(),
    text: '',
    textStyle: { token: '' },
    colorStyle: { token: '' },
    rightIcon: createImageComponent(`${id}-right-icon`)
  };

  return input;
};

const createSpacerComponent = (id: string): Spacer => {
  const spacer: Spacer = {
    id,
    type: 'spacer',
    interactions: [],
    width: matchParentSize(),
    height: wrapContentSize()
  };

  return spacer;
};

const createProgressBarComponent = (id: string): ProgressBar => {
  const progressBar: ProgressBar = {
    id,
    type: 'progressBar',
    interactions: [],
    width: matchParentSize(),
    height: wrapContentSize()
  };

  return progressBar;
};

const createSwitchComponent = (id: string): SwitchComponent => {
  const switchComponent: SwitchComponent = {
    id,
    type: 'switch',
    interactions: [],
    width: wrapContentSize(),
    height: wrapContentSize()
  };

  return switchComponent;
};

const createButtonComponent = (id: string): Button => {
  const button: Button = {
    id,
    type: 'button',
    interactions: [],
    width: wrapContentSize(),
    height: wrapContentSize(),
    text: '',
    textStyle: { token: '' },
    textColorStyle: { token: '' },
    enabled: true
  };

  return button;
};

const createStatefulComponent = (id: string): StatefulComponent => {
  const statefulComponent: StatefulComponent = {
    id,
    type: 'stateful',
    interactions: [],
    width: matchParentSize(),
    height: wrapContentSize(),
    states: []
  };

  return statefulComponent;
};

const createDynamicColumnComponent = (id: string): DynamicColumn => {
  const dynamicColumn: DynamicColumn = {
    id,
    type: 'dynamicColumn',
    interactions: [],
    width: matchParentSize(),
    height: wrapContentSize(),
    itemsData: '',
    itemAlias: 'item',
    itemTemplateId: ''
  };

  return dynamicColumn;
};

const createDynamicRowComponent = (id: string): DynamicRow => {
  const dynamicRow: DynamicRow = {
    id,
    type: 'dynamicRow',
    interactions: [],
    width: matchParentSize(),
    height: wrapContentSize(),
    itemsData: '',
    itemAlias: 'item',
    itemTemplateId: ''
  };

  return dynamicRow;
};

export const generateEmptyComponent = ({ id, type }: GenerateEmptyComponentParams): Component => {
  switch (type) {
    case 'box':
      return createBoxComponent(id);
    case 'row':
      return createRowComponent(id);
    case 'column':
      return createColumnComponent(id);
    case 'text':
      return createTextComponent(id);
    case 'input':
      return createInputComponent(id);
    case 'image':
      return createImageComponent(id);
    case 'spacer':
      return createSpacerComponent(id);
    case 'progressBar':
      return createProgressBarComponent(id);
    case 'switch':
      return createSwitchComponent(id);
    case 'button':
      return createButtonComponent(id);
    case 'stateful':
      return createStatefulComponent(id);
    case 'dynamicColumn':
      return createDynamicColumnComponent(id);
    case 'dynamicRow':
      return createDynamicRowComponent(id);

    default:
      return createBoxComponent(id);
  }
};
