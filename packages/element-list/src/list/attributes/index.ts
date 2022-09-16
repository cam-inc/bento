import { Element } from '@bento-editor/core';

export type Attributes = {
  listStyleType?: 'disc' | 'circle';
};

const attributes: Element<Attributes>['attributes'] = {
  defaultValue: {
    listStyleType: 'disc',
  },
};
export default attributes;
