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
    // Allow only elements of type `list-item`.
    let isNormalized: boolean = false;
    const [node, path] = entry;
    for (const [child, childPath] of helpers.Node.children(editor, path)) {
      if (!helpers.Element.isElement(child) || child.type !== 'list-item') {
        helpers.logger.warn({
          messages: [
            'Element removed.',
            {
              from: [node, path],
              target: [child, childPath],
            },
          ],
        });
        editor.removeNodes({
          at: childPath,
        });
        isNormalized = true;
      }
    }
    return isNormalized;
  },
  insertBreak: (editor, nodeEntry) =>
    helpers.insertBreaks.copyInsertBreak(editor, nodeEntry),
};

export default element;
