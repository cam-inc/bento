import { Text } from '@bento-editor/core';

export type Attributes = {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
};

const attributes: Text<Attributes>['attributes'] = {
  defaultValue: {
    bold: false,
    italic: false,
    strikethrough: false,
    underline: false,
  },
};
export default attributes;
