import React from 'react';
import { BaseElement } from 'slate'

export type HeadingElement = BaseElement & {
  type: 'heading';
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
