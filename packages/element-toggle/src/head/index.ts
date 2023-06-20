import { Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'toggle-head',
  attributes,
  editable,
  insertBreak: (editor, nodeEntry) => {
    const [node] = nodeEntry;
    if (helpers.textHelpers.isEmpty(node)) {
      helpers.nodeHelpers.removeNode(editor, nodeEntry);
    } else {
      editor.splitNodes({ always: true });
    }
    return true;
  },
};
export default element;
