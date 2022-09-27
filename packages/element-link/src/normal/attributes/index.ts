import { Element } from '@bento-editor/core';

export type Attributes = {
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  placeholder?: string;
};

const attributes: Element<Attributes>['attributes'] = {
  defaultValue: {
    href: '',
    target: '_blank',
    placeholder: 'URLを入力・貼り付け',
  },
};

export default attributes;
