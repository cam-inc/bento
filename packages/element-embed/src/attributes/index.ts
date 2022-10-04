import { Element } from '@bento-editor/core';

export type Attributes = {
  href?: string;
  placeholder?: string;
  title?: string;
};

const attributes: Element<Attributes>['attributes'] = {
  defaultValue: {
    href: '',
    placeholder: 'URLを入力・貼り付け',
    title: '',
  },
};

export default attributes;
