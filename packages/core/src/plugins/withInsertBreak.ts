import { Element, Range } from 'slate';
import { Editor } from 'slate';
import { EditorPlugin } from '.';
import { helpers } from '../helpers';

export const withInsertBreak: EditorPlugin = (editor, config) => {
  const originalInsertBreak = editor.insertBreak;

  // @see: https://docs.slatejs.org/api/nodes/editor#insertbreak-greater-than-void
  editor.insertBreak = () => {
    const { selection } = editor;
    if (selection) {
      helpers.rangeHelpers.deleteRange(editor, selection);
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
            const isToReturn = element.insertBreak(editor, match, config);
            if (isToReturn) {
              return;
            }
          }
        }
      }

      const pointStart = Range.start(selection);
      editor.splitNodes({ always: true });
      if (pointStart.offset === 0) {
        editor.setNodes(
          {
            type: config.defaultElement.type,
          },
          { at: [selection.anchor.path[0]] }
        );
      } else {
        editor.setNodes({
          type: config.defaultElement.type,
        });
      }
      return;
    }
    originalInsertBreak();
  };
  return editor;
};
