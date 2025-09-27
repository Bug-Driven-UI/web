import { useClickOutside } from '@siberiacancode/reactuse';
import Sketch from '@uiw/react-color-sketch';
import React from 'react';

const PRESET_COLORS = [
  '#D0021B',
  '#F5A623',
  '#f8e61b',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE'
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen(!open);
  const sketchRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div ref={sketchRef} className='mt-2'>
      <div
        className='rounded-[4px relative size-10 cursor-pointer'
        style={{ backgroundColor: value }}
        onClick={toggleOpen}
      />
      <Sketch
        disableAlpha
        style={{
          position: 'absolute',
          display: open ? 'block' : 'none',
          zIndex: '100'
        }}
        color={value}
        onChange={(color) => onChange(color.hex)}
        presetColors={PRESET_COLORS}
      />
    </div>
  );
};
