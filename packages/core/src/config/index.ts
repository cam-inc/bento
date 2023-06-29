import {
  BaseEditor,
  Descendant,
  Editor,
  NodeEntry,
  Path,
  Text as SlateText,
} from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import { PartialDeep } from 'type-fest';
import { ThemeToken } from '../theme/index.css';

// All the custom elements and texts must follow this type.
// @see: https://docs.slatejs.org/concepts/12-typescript#why-is-the-type-definition-unusual
export type CustomElement<
  Attributes extends Record<string, any> = Record<string, any>
> = {
  type: string;
  attributes?: Attributes;
  children: (CustomElement | CustomText)[];
};
export type CustomText<
  Attributes extends Record<string, any> = Record<string, any>
> = {
  type?: string;
  attributes?: Attributes;
  text: string;
};
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

type Plugin = (editor: Editor, entry: NodeEntry, config: Config) => boolean;

export type Element<
  Attributes extends Record<string, any> = Record<string, any>
> = {
  type: string;
  attributes: {
    defaultValue: Attributes;
  };
  editable: {
    Component: React.FC<
      RenderElementProps & {
        element: {
          attributes?: Attributes;
        };
        editor: Editor;
        path: Path;
      }
    >;
    defaultValue: Descendant[];
  };
  toolbox?: {
    Icon: React.FC;
    Thumb?: React.FC;
    title: string;
    description?: string;
  };
  // The boolean value returned from this function is to be used to determine whether to kiff off a new normalization path.
  // @see: https://docs.slatejs.org/concepts/11-normalizing#multi-pass-normalizing
  normalizeNode?: Plugin;
  insertBreak?: Plugin;
  insertSoftBreak?: Plugin;
  isVoid?: boolean;
};

export type Text<Attributes extends Record<string, any> = Record<string, any>> =
  {
    type: string;
    attributes: {
      defaultValue: Attributes;
    };
    editable: {
      Component: React.FC<
        RenderLeafProps & {
          text: {
            attributes?: Attributes;
          };
          leaf: {
            attributes?: Attributes;
          };
          editor: Editor;
          path: Path;
        }
      >;
      defaultValue?: SlateText[];
    };
    toolbar?: {
      Component: React.FC<{
        editor: Editor;
      }>;
    };
    toolbox?: {
      Icon: React.FC;
      Thumb?: React.FC;
      title: string;
      description?: string;
    };
    normalizeNode?: (editor: Editor, entry: NodeEntry) => boolean;
  };

export type Config = {
  elements: Element[];
  texts: Text[];
  /**
   * @description must be passed one of the given elements
   */
  defaultElement: Element;
  themeToken: PartialDeep<ThemeToken>;
  rootPlaceholder?: string;
};

export type PickRequired<T extends Record<string, any>, K extends keyof T> = {
  [P in keyof Omit<T, K>]: Omit<T, K>[P];
} & { [P in K]-?: T[P] };
