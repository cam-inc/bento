import { Element } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';

const element: Element<Attributes> = {
  type: 'paragraph',
  attributes,
  editable,
  toolbox,
  normalizeNode: (/*editor, entry*/) => {
    // TODO: textのみを許可。
    return false;
  },
};

export default element;
