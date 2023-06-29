import { useCallback } from 'react';
import { Editor, Path, Transforms as SlateTransforms } from 'slate';
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

export const selectLineEnd = (editor: Editor, path: Path) => {
  const endPoint = editor.end(path);
  editor.select(endPoint);
};
