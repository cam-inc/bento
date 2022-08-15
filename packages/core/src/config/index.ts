import React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

type Element = {
  type: string;
  Component: React.FC<RenderElementProps>;
};

type Text = {
  type: string;
  Component: React.FC<RenderLeafProps>;
  Toolbar: React.FC;
};

export type Config = {
  elements: Element[];
  texts: Text[];
};
