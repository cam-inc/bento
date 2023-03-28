import { Element, Transforms } from 'slate';
import { EditorPlugin } from '.';

export const withOriginalNormalizeNode: EditorPlugin = (editor, config) => {
  // Set domain specific constraints.
  // @see: https://docs.slatejs.org/concepts/11-normalizing
  const originalNormalizeNode = editor.normalizeNode;
  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (editor.children.length === 0) {
      const { defaultElement } = config;
      Transforms.insertNodes(
        editor,
        {
          type: defaultElement.type,
          children: defaultElement.editable.defaultValue,
        },
        {
          at: path.concat(0),
          select: true,
        }
      );
    }
    if (Element.isElement(node)) {
      const { elements } = config;
      const element = elements.find((element) => {
        return element.type === node.type;
      });
      if (element && element.normalizeNode) {
        const isToReturn = element.normalizeNode(editor, entry, config);
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
