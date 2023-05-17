import { Element } from '@bento-editor/core';

export type Attributes = {
  cite?: string;
};

const attributes: Element<Attributes>['attributes'] = {
  defaultValue: {},
};
export default attributes;
