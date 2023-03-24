import { Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'note',
  attributes,
  editable,
  toolbox,
  normalizeNode: (editor, entry) => {
    return helpers.childHelpers.restrictedChildren(editor, entry, 'note-body');
  },
};

export default element;
