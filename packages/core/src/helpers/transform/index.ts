import { useCallback, useMemo } from 'react';
import { Transforms as SlateTransforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

export default SlateTransforms;

export const useTransformsSetNodes = (
  element: Parameters<typeof ReactEditor.findPath>[1]
) => {
  const editor = useSlate();

  const path = useMemo(() => {
    const path = ReactEditor.findPath(editor, element);
    return path;
  }, [editor, element]);

  return useCallback(
    (props: Parameters<typeof SlateTransforms.setNodes>[1]) => {
      return SlateTransforms.setNodes(editor, props, {
        at: path,
      });
    },
    [editor, path]
  );
};
