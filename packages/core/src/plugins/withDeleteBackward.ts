import { Editor, Element, Node, Text } from 'slate';
import { EditorPlugin } from '.';

export const withDeleteBackward: EditorPlugin = (editor) => {
  const originalDeleteBackward = editor.deleteBackward;

  editor.deleteBackward = (unit) => {
    const { selection } = editor;
    if (selection && editor.isStart(selection.anchor, selection)) {
      // 前のnodeのtypeを使用するように変更
      let previousNode: Node;
      const previousPoint = editor.before(selection);
      if (previousPoint) {
        [previousNode] = editor.node(previousPoint);
        if (previousNode && !Editor.isEditor(previousNode)) {
          if (Text.isText(previousNode)) {
            [previousNode] = editor.parent(previousPoint);
          }
          if (Element.isElement(previousNode)) {
            editor.setNodes({ type: previousNode.type });
          }
        }
      }
    }
    originalDeleteBackward(unit);
  };
  return editor;
};
