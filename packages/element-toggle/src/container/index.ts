import { Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'toggle',
  attributes,
  editable,
  toolbox,
  normalizeNode: (editor, entry) => {
    // Allow only elements of type `list-item`.
    let isNormalized: boolean = false;
    const [node, path] = entry;
    for (const [child, childPath] of helpers.Node.children(editor, path)) {
      if (!helpers.Element.isElement(child) || (child.type !== 'toggle-head' && child.type !== 'toggle-body')) {
        helpers.logger.warn({
          messages: [
            'Element removed.',
            {
              from: [node, path],
              target: [child, childPath],
            },
          ],
        });
        helpers.Transforms.removeNodes(editor, {
          at: childPath,
        });
        isNormalized = true;
      }
    }
    return isNormalized;
  },
};
export default element;
