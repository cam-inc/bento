import React from 'react';
import { BaseEditor, Descendant, Editor, NodeEntry } from 'slate';
import { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import { PartialDeep } from 'type-fest';
import { ThemeToken } from '../theme/index.css';

// All the custom elements and texts must follow this type.
// @see: https://docs.slatejs.org/concepts/12-typescript#why-is-the-type-definition-unusual
type CustomElement<Attributes extends Record<string, any> = {}> = { type?: string, attributes?: Attributes, children: Descendant[]; };
type CustomText<Attributes extends Record<string, any> = {}> = { type?: string, attributes?: Attributes; text: string; }
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export type Element<Attributes extends Record<string, any> = {}> = {
  type: string;
  attributes: {
    defaultValue: Attributes;
  },
  editable: {
    Component: React.FC<RenderElementProps & {
      element: {
        attributes?: Attributes;
      }
    }>;
    defaultValue: Descendant[];
  },
  toolbox: {
    Icon: React.FC;
  };
  // The boolean value returned from this function is to be used to determine whether to kiff off a new normalization path.
  // @see: https://docs.slatejs.org/concepts/11-normalizing#multi-pass-normalizing
  normalizeNode?: (editor: Editor, entry: NodeEntry) => boolean;
};

export type Text<Attributes extends Record<string, any> = {}> = {
  type: string;
  attributes: {
    defaultValue: Attributes;
  },
  editable: {
    Component: React.FC<RenderLeafProps & {
      text: {
        attributes?: Attributes;
      };
      leaf: {
        attributes?: Attributes;
      }
    }>;
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
