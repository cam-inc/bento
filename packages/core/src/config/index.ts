import React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { PartialDeep } from 'type-fest';
import { ThemeToken } from '../theme/index.css';

export type Element = {
  type: string;
  editable: {
    Component: React.FC<RenderElementProps>;
    // TODO: Element毎により詳細に指定可能に。
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
  themeToken: PartialDeep<ThemeToken>;
};
