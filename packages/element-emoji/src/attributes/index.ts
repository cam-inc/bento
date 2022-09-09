import { Element } from '@bento-editor/core';

export type Attributes = {
  'picker-status': 'open' | 'close';
};

const attributes: Element<Attributes>['attributes'] = {
  defaultValue: {
    'picker-status': 'close',
  },
};

export default attributes;
