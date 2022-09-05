import { Element } from '@bento-editor/core';

export type Attributes = {
  level?: 1 | 2 | 3;
};

const attributes: Element<Attributes>['attributes'] = {
  defaultValue: {
    level: 1
  }
};
export default attributes;
