import { Editor, Text as SlateText, Transforms } from 'slate';

export const isText = SlateText.isText;

export const hasAttribute = (editor: Editor, key: string) => {
  const marks = Editor.marks(editor);
  return Object.keys(marks?.attributes || {}).includes(key);
};

export const removeTextAttribute = (editor: Editor, attribute: string) => {
  const marks = Object.assign({}, Editor.marks(editor)?.attributes);
  delete marks[attribute];
  Transforms.setNodes(
    editor,
    {
      attributes: marks,
    },
    { match: (n) => SlateText.isText(n), split: true }
  );
};

export const setTextAttribute = (
  editor: Editor,
  newAttributes: Record<string, any>
) => {
  Transforms.setNodes(
    editor,
    {
      attributes: {
        ...Editor.marks(editor)?.attributes,
        ...newAttributes,
      },
    },
    { match: (n) => SlateText.isText(n), split: true }
  );
};

export default SlateText;
