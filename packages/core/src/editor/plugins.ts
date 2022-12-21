import { Element } from 'slate';
import { Editor, Range } from 'slate';
import { Config } from '../config';

// @see: https://docs.slatejs.org/concepts/08-plugins
type EditorPlugin = (editor: Editor, config: Config) => Editor;

export const withInsertBreak: EditorPlugin = (editor, config) => {
  const originalInsertBreak = editor.insertBreak;

  // @see: https://docs.slatejs.org/api/nodes/editor#insertbreak-greater-than-void
  editor.insertBreak = () => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(editor, {
        match: (n) => !Editor.isEditor(n) && Element.isElement(n),
        mode: 'lowest',
      });
      if (match) {
        const [node] = match;
        if (Element.isElement(node)) {
          const { elements } = config;
          const element = elements.find((element) => {
            return element.type === node.type;
          });
          if (element && element.insertBreak) {
            const isToReturn = element.insertBreak(editor, match);
            if (isToReturn) {
              return;
            }
          }
        }
      }
    }
    originalInsertBreak();
  };
  return editor;
};

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

export const withOriginalIsVoid: EditorPlugin = (editor, config) => {
  const originalIsVoid = editor.isVoid;
  editor.isVoid = (elementNode) => {
    const { elements } = config;
    const element = elements.find((element) => {
      return element.type === elementNode.type;
    });
    if (element && element.isVoid) {
      return true;
    }
    return originalIsVoid(elementNode);
  };
  return editor;
};
