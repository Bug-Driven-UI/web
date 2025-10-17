import type { CSSProperties } from 'react';

import type { RenderedComponent } from '@/generated/api/engine/models';

export const getRenderedComponentStyle = (component: RenderedComponent) => {
  const style: CSSProperties = {};

  if (component.paddings) {
    if (component.paddings.top) {
      style.paddingTop = component.paddings.top;
    }
    if (component.paddings.bottom) {
      style.paddingBottom = component.paddings.bottom;
    }
    if (component.paddings.start) {
      style.paddingLeft = component.paddings.start;
    }
    if (component.paddings.end) {
      style.paddingRight = component.paddings.end;
    }
  }

  if (component.margins) {
    if (component.margins.top) {
      style.marginTop = component.margins.top;
    }
    if (component.margins.bottom) {
      style.marginBottom = component.margins.bottom;
    }
    if (component.margins.start) {
      style.marginLeft = component.margins.start;
    }
    if (component.margins.end) {
      style.marginRight = component.margins.end;
    }
  }

  if (component.width) {
    if (component.width.type === 'fixed') {
      style.width = component.width.value;
    }
    if (component.width.type === 'matchParent') {
      style.width = '100%';
    }
    if (component.width.type === 'wrapContent') {
      style.width = 'fit-content';
    }
    if (component.width.type === 'weighted') {
      style.flexGrow = component.width.fraction;
      style.flexShrink = component.width.fraction;
      style.flexBasis = '0%';
      style.minWidth = 0;
    }
  }

  if (component.height) {
    if (component.height.type === 'fixed') {
      style.height = component.height.value;
    }
    if (component.height.type === 'matchParent') {
      style.height = '100%';
    }
    if (component.height.type === 'wrapContent') {
      style.height = 'fit-content';
    }
    if (component.height.type === 'weighted') {
      style.flexGrow = component.height.fraction;
      style.flexShrink = component.height.fraction;
      style.flexBasis = '0%';
      style.minHeight = 0;
    }
  }

  if (component.shape) {
    style.borderTopLeftRadius = component.shape.topLeft;
    style.borderTopRightRadius = component.shape.topRight;
    style.borderBottomLeftRadius = component.shape.bottomLeft;
    style.borderBottomRightRadius = component.shape.bottomRight;
  }

  if (component.border) {
    style.borderStyle = 'solid';
    style.borderWidth = component.border.thickness;
    style.borderColor = component.border.color.hex;
  }

  if (component.backgroundColor) {
    style.backgroundColor = component.backgroundColor.hex;
  }

  if (component.type === 'input' || component.type === 'text') {
    style.color = component.textWithStyle.colorStyle.hex;
    if (component.textWithStyle.textStyle) {
      style.fontSize = component.textWithStyle.textStyle.size;
      if (component.textWithStyle.textStyle.weight) {
        style.fontWeight = component.textWithStyle.textStyle.weight;
      }
      if (component.textWithStyle.textStyle.lineHeight) {
        style.lineHeight = `${component.textWithStyle.textStyle.lineHeight}px`;
      }
      if (component.textWithStyle.textStyle.decoration === 'italic') {
        style.fontStyle = 'italic';
      }
      if (component.textWithStyle.textStyle.decoration === 'regular') {
        style.fontStyle = 'normal';
      }
      if (component.textWithStyle.textStyle.decoration === 'strikeThrough') {
        style.textDecoration = 'line-through';
      }
      if (component.textWithStyle.textStyle.decoration === 'strikeThroughRed') {
        // todo
        style.textDecoration = 'line-through';
      }
      if (component.textWithStyle.textStyle.decoration === 'underline') {
        style.textDecoration = 'underline';
      }
    }
  }

  if (component.interactions.length) {
    style.cursor = 'pointer';
  }

  return style;
};
