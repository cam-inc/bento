import { Element } from '@bento-editor/core';

export type Attributes = {
  isOpen: boolean;
};

const attributes: Element<Attributes>['attributes'] = {
  defaultValue: {
    isOpen: true,
  },
};

export default attributes;
