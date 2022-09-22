import { Element } from '@bento-editor/core';

export type Attributes = {
  checked?: boolean;
};

const attributes: Element<Attributes>['attributes'] = {
  defaultValue: {
    checked: false,
  },
};

export default attributes;
