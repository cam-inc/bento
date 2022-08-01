import React from 'react';
import { BaseElement } from 'slate'
import { RenderElementProps } from 'slate-react';

export type ParagraphElement = BaseElement & {
  type: 'paragraph';
};
export type ParagraphProps = RenderElementProps & {
  element: ParagraphElement;
};

export const Paragraph: React.FC<ParagraphProps> = ({ attributes, element, children }) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>I am of type {element.type}</div>
      <div style={{ paddingLeft: '12px' }}>{children}</div>
    </div>
  );
};


const Wrapper: React.FC = ({ children }) => {
  return (
    <div>
      <div></div>
      <div>{children}</div>
    </div>
  );
};
