import { Element } from '@bento-editor/core';

export type Attributes = {
  href?: string;
  text?: string;
  target?: React.HTMLAttributeAnchorTarget;
  hrefPlaceholder?: string;
  textPlaceholder?: string;
};

const attributes: Element<Attributes>['attributes'] = {
  defaultValue: {
    href: '',
    text: '',
    target: '_blank',
    hrefPlaceholder: 'URLを入力・貼り付け',
    textPlaceholder: 'タイトルを入力',
  },
};

export default attributes;
