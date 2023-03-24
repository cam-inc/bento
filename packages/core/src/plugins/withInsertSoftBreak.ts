import { Element } from 'slate';
import { Editor, Range } from 'slate';
import { EditorPlugin } from '.';

export const withInsertSoftBreak: EditorPlugin = (editor, config) => {
  const originalInsertSoftBreak = editor.insertSoftBreak;

  // @see: https://docs.slatejs.org/api/nodes/editor#insertsoftbreak-greater-than-void
  editor.insertSoftBreak = () => {
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
          if (element && element.insertSoftBreak) {
            const isToReturn = element.insertSoftBreak(editor, match);
            if (isToReturn) {
              return;
            }
          }
        }
      }
    }
    originalInsertSoftBreak();
  };
  return editor;
};
