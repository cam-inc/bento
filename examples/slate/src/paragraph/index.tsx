import React from 'react';
import { BaseElement } from 'slate';

export type ParagraphElement = BaseElement & {
  type: 'paragraph';
};
export type ParagraphProps = {
  element: ParagraphElement;
  children: React.ReactNode;
};

export const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  return (
    <div>{children}</div>
  );
};
