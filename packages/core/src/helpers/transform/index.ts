import { useCallback } from 'react';
import { Editor, Path, Transforms as SlateTransforms, Text } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

export const useTransformsSetNodes = (
  element: Parameters<typeof ReactEditor.findPath>[1]
) => {
  const editor = useSlate();
  return useCallback(
    (props: Parameters<typeof SlateTransforms.setNodes>[1]) => {
      const path = ReactEditor.findPath(editor, element);
      editor.setNodes(props, {
        at: path,
      });
    },
    [editor, element]
  );
};

export const selectNextLineEnd = (editor: Editor, path: Path) => {
  const [endNode, endPath] = editor.node(path, { edge: 'end' });
  if (!Text.isText(endNode)) {
    return;
  }
  editor.select({
    path: endPath,
    offset: endNode.text.length,
  });
};
