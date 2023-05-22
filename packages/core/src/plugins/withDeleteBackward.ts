import { Element, Text } from 'slate';
import { EditorPlugin } from '.';

export const withDeleteBackward: EditorPlugin = (editor) => {
  const originalDeleteBackward = editor.deleteBackward;

  editor.deleteBackward = (unit) => {
    const { selection } = editor;
    if (selection && editor.isStart(selection.anchor, selection)) {
      const previousPoint = editor.before(selection);
      if (previousPoint) {
        // 前のnodeのtypeを使用するように変更
        if (Text.isText(editor.node(previousPoint)[0])) {
          const parent = editor.parent(previousPoint)[0];
          if (Element.isElement(parent)) {
            editor.setNodes({ type: parent.type });
          }
        }
      }
    }
    originalDeleteBackward(unit);
  };
  return editor;
};
