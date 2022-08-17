import React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

export type Element = {
  type: string;
  editable: {
    Component: React.FC<RenderElementProps>;
    defaultValue: unknown[];
  },
  toolbox: {
    Icon: React.FC;
  };
};

export type Text = {
  type: string;
  editable: {
    Component: React.FC<RenderLeafProps>;
  },
  toolbar: {
    Icon: React.FC;
  };
};

export type Config = {
  elements: Element[];
  texts: Text[];
};