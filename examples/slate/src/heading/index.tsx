import React from 'react';
import { BaseElement, Text } from 'slate'

export type HeadingElement = BaseElement & {
  type: 'heading';
  children: Text[];
};
export type HeadingProps = {
  element: HeadingElement;
  children: React.ReactNode;
};
export const Heading: React.FC<HeadingProps> = ({ children, }) => {
  return (
    <h1>{children}</h1>
  );
};
