import React from 'react';
import { BaseElement, Text } from 'slate';

export type ParagraphElement = BaseElement & {
  type: 'paragraph';
  children: Text[];
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
