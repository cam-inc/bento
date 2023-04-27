import { useCallback } from 'react';
import { Transforms as SlateTransforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

export default SlateTransforms;

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
