import { Editor } from 'slate';

export const isActiveAttribute = (editor: Editor, key: string) => {
  const marks = Editor.marks(editor);
  return !!marks?.attributes?.[key];
};
