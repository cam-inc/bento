import { Text } from '@bento-editor/core';

export type Attributes = {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
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
