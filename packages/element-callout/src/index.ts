import { Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'callout',
  attributes,
  editable,
  toolbox,
  insertBreak: (editor, nodeEntry) => {
    const [node] = nodeEntry;
    if (helpers.textHelpers.isTextEmpty(node)) {
      helpers.nodeHelpers.removeNode(editor, nodeEntry);
    } else {
      editor.splitNodes({ always: true });
    }
    return true;
  },
};

export default element;
