import { Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'ordered-list',
  attributes,
  editable,
  toolbox,
  normalizeNode: (editor, entry) => {
    return helpers.normalizeNode.nestedElementNormalizeNode(
      editor,
      entry,
      'list-item'
    );
  },
  insertBreak: (editor, nodeEntry) => {
    const [node, path] = nodeEntry;
    if (helpers.Element.isElement(node) && !editor.isEmpty(node)) {
      editor.splitNodes({ always: true });
      return true;
    }
    const next = editor.next();
    if (next) {
      const [_, nextPath] = next;
      const [parentNode, parentPath] = editor.parent(nextPath);
      if (helpers.Element.isElement(parentNode) && !editor.isVoid(parentNode)) {
        helpers.selectLineEnd(editor, parentPath);
      }
    }
    editor.removeNodes({ at: path });
    return true;
  },
};

export default element;
