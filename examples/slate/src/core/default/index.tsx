import React from 'react';
import { BaseElement } from 'slate'

export type DefaultElement = BaseElement & {
  type: 'default';
};
export type DefaultProps = {
  element: DefaultElement;
  children: React.ReactNode;
};
export const Default: React.FC<DefaultProps> = ({ children }) => {
  return (
    <div>{children}</div>
  );
};
