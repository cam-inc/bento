import { Element } from 'slate';
import { Editor, Range } from 'slate';
import { EditorPlugin } from '.';

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
