import { Editor, Text as SlateText } from 'slate';

export const isText = SlateText.isText;

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return !!marks?.attributes?.[format];
};

export default SlateText;
