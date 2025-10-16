import type { RenderedComponent } from '@/generated/api/engine/models';

export const getRenderedComponentClassName = (component: RenderedComponent) => {
  const classes: string[] = [];

  if (component.paddings) {
    if (component.paddings.top) {
      classes.push(`pt-[${component.paddings.top}px]`);
    }
    if (component.paddings.bottom) {
      classes.push(`pb-[${component.paddings.bottom}px]`);
    }
    if (component.paddings.start) {
      classes.push(`pl-[${component.paddings.start}px]`);
    }
    if (component.paddings.end) {
      classes.push(`pr-[${component.paddings.end}px]`);
    }
  }

  if (component.margins) {
    if (component.margins.top) {
      classes.push(`mt-[${component.margins.top}px]`);
    }
    if (component.margins.bottom) {
      classes.push(`mb-[${component.margins.bottom}px]`);
    }
    if (component.margins.start) {
      classes.push(`ml-[${component.margins.start}px]`);
    }
    if (component.margins.end) {
      classes.push(`mr-[${component.margins.end}px]`);
    }
  }

  if (component.width) {
    if (component.width.type === 'fixed') {
      classes.push(`w-[${component.width.value}px]`);
    }
    if (component.width.type === 'matchParent') {
      classes.push('w-full');
    }
    if (component.width.type === 'wrapContent') {
      classes.push('w-fit');
    }
    if (component.width.type === 'weighted') {
      classes.push(`flex-[${component.width.fraction}_${component.width.fraction}_0%] min-w-0`);
    }
  }

  if (component.height) {
    if (component.height.type === 'fixed') {
      classes.push(`h-[${component.height.value}px]`);
    }
    if (component.height.type === 'matchParent') {
      classes.push('h-full');
    }
    if (component.height.type === 'wrapContent') {
      classes.push('h-fit');
    }
    if (component.height.type === 'weighted') {
      classes.push(`flex-[${component.height.fraction}_${component.height.fraction}_0%] min-w-0`);
    }
  }

  if (component.shape) {
    classes.push(`rounded-tl-[${component.shape.topLeft}px]`);
    classes.push(`rounded-tr-[${component.shape.topRight}px]`);
    classes.push(`rounded-bl-[${component.shape.bottomLeft}px]`);
    classes.push(`rounded-br-[${component.shape.bottomRight}px]`);
  }

  if (component.border) {
    classes.push('border-solid');
    classes.push(`border-[${component.border.thickness}px]`);
    classes.push(`border-[${component.border.color}]`);
  }

  if (component.backgroundColor) {
    classes.push(`bg-[${component.backgroundColor.hex}]`);
  }

  if (component.type === 'input' || component.type === 'text') {
    classes.push(`text-[${component.textWithStyle.colorStyle.hex}]`);
    if (component.textWithStyle.textStyle) {
      classes.push(`text-[${component.textWithStyle.textStyle.size}px]`);
      if (component.textWithStyle.textStyle.weight) {
        classes.push(`font-[${component.textWithStyle.textStyle.weight}]`);
      }
      if (component.textWithStyle.textStyle.lineHeight) {
        classes.push(`leading-[${component.textWithStyle.textStyle.lineHeight}]`);
      }
      if (component.textWithStyle.textStyle.decoration === 'italic') {
        classes.push(`italic`);
      }
      if (component.textWithStyle.textStyle.decoration === 'regular') {
        classes.push(`not-italic`);
      }
      if (component.textWithStyle.textStyle.decoration === 'strikeThrough') {
        classes.push(`line-through`);
      }
      if (component.textWithStyle.textStyle.decoration === 'strikeThroughRed') {
        // todo
        classes.push(`line-through`);
      }
      if (component.textWithStyle.textStyle.decoration === 'underline') {
        classes.push(`underline`);
      }
    }
  }

  return classes.join(' ');
};
