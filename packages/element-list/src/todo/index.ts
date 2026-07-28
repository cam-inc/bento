import { Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'todo-list',
  attributes,
  editable,
  toolbox,
  normalizeNode: (editor, entry) => {
    return helpers.normalizeNode.nestedElementNormalizeNode(
      editor,
      entry,
      'todo-list-item'
    );
  },
};

export default element;
