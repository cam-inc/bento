import React from 'react';
import { HexAlphaColorPicker } from 'react-colorful';

type ColorPickerProps = Parameters<typeof HexAlphaColorPicker>[0];

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  return <HexAlphaColorPicker {...props} />;
};
