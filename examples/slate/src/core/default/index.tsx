import React from 'react';
import { BaseElement } from 'slate'
import { RenderElementProps } from 'slate-react';

export type DefaultElement = BaseElement & {
  type: 'default';
};
export type DefaultProps = RenderElementProps & {
  element: DefaultElement;
};
export const Default: React.FC<DefaultProps> = ({ attributes, element, children }) => {
  return (
    <div>
      <div>I am of type {element.type}</div>
      <div {...attributes}>{children}</div>
    </div>
  );
};
