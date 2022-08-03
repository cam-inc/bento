import React from 'react';
import { RenderLeafProps } from 'slate-react';

export type TextWrapperProps = RenderLeafProps;
export const TextWrapper: React.FC<TextWrapperProps> = (props) => {
  return (
    <span {...props.attributes}>{props.children}</span>
  );
}
