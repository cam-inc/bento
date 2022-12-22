import { Element } from 'slate';
import { EditorPlugin } from '.';

export const withOriginalNormalizeNode: EditorPlugin = (editor, config) => {
  // Set domain specific constraints.
  // @see: https://docs.slatejs.org/concepts/11-normalizing
  const originalNormalizeNode = editor.normalizeNode;
  editor.normalizeNode = (entry) => {
    const [node] = entry;
    if (Element.isElement(node)) {
      const { elements } = config;
      const element = elements.find((element) => {
        return element.type === node.type;
      });
      if (element && element.normalizeNode) {
        const isToReturn = element.normalizeNode(editor, entry);
        if (isToReturn) {
          // @see: https://docs.slatejs.org/concepts/11-normalizing#multi-pass-normalizing
          return;
        }
      }
    }
    // Fall back to the original `normalizeNode` to enforce other constraints.
    originalNormalizeNode(entry);
  };
  return editor;
};
