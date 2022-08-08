import React from 'react';
import { RenderElementProps } from 'slate-react';

type Element = {
  type: string;
  Component: React.FC<RenderElementProps>;
};

export type Config = {
  elements: Element[];
};
