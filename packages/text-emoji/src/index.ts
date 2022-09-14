import { Text } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export { EmojiRenderer } from './renderer';

const element: Text<Attributes> = {
  type: 'emoji',
  attributes,
  editable,
  toolbox,
  normalizeNode: () => {
    return false;
  },
};

export default element;
