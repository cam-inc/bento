import { Text } from '@bento-editor/core';

export type Attributes = {
  bold?: boolean;
  italic?: boolean;
};

const attributes: Text<Attributes>['attributes'] = {
  defaultValue: {
    bold: false,
    italic: false,
  }
};
export default attributes;
