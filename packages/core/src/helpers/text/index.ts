import { Editor, Node, Text as SlateText } from 'slate';

export const isText = SlateText.isText;

export const hasAttribute = (editor: Editor, key: string) => {
  const marks = editor.getMarks();
  if (!marks?.attributes) {
    return false;
  }
  return marks.attributes.hasOwnProperty(key);
};

export const removeTextAttribute = (editor: Editor, attribute: string) => {
  const marks = Object.assign({}, editor.marks?.attributes);
  delete marks[attribute];
  editor.setNodes(
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
  const marks = editor.getMarks();
  editor.setNodes(
    {
      attributes: {
        ...marks?.attributes,
        ...newAttributes,
      },
    },
    { match: (n) => SlateText.isText(n), split: true }
  );
};

export const isTextEmpty = (node: Node) => {
  const textNodeList = Array.from(Node.texts(node));
  const firstTextNode = textNodeList[0][0];
  if (!SlateText.isText(firstTextNode)) {
    return false;
  }

  return !firstTextNode.text.length;
};

export default SlateText;
