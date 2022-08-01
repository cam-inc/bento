import React from 'react';
import { BaseElement } from 'slate'
import { RenderElementProps } from 'slate-react';

export type HeadingElement = BaseElement & {
  type: 'heading';
};
export type HeadingProps = RenderElementProps & {
  element: HeadingElement;
};
export const Heading: React.FC<HeadingProps> = ({ attributes, element, children, }) => {
  return (
    <div {...attributes}>
      <div>I am of type {element.type}</div>
      <h1>{children}</h1>
    </div>
  );
};
