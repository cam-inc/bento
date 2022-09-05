import { Element } from '@bento-editor/core';

export type Attributes = {
  foo: 'hoge' | 'bar';
};

const attributes: Element<Attributes>['attributes'] = {
  defaultValue: {
    foo: 'hoge'
  }
};
export default attributes;
