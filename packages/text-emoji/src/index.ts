import { Text } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbar from './toolbar';
export { EmojiRenderer } from './renderer';

const element: Text<Attributes> = {
  type: 'emoji',
  attributes,
  editable,
  toolbar,
};

export default element;
