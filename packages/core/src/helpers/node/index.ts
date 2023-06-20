import { Editor, Element, NodeEntry, Node as SlateNode, Text } from 'slate';

export default SlateNode;

/**
 * Remove Node.
 */
export const removeNode = (editor: Editor, entry: NodeEntry) => {
  const path = entry[1];
  const next = editor.next();
  if (!next) {
    return false;
  }
  const [nextNode, nextPath] = next;
  const parentEntry = editor.parent(nextPath);
  const textNodeList = Array.from(
    editor.nodes({
      at: parentEntry[1],
      match: (node) => Text.isText(node),
    })
  );
  const [lastNode, lastNodePath] = textNodeList[textNodeList.length - 1];
  if (!Text.isText(lastNode)) {
    return true;
  }
  if (Element.isElement(nextNode)) {
    if (editor.isVoid(nextNode)) {
      editor.removeNodes({ at: path });
      return true;
    }
  }
  editor.setSelection({
    anchor: {
      path: lastNodePath,
      offset: lastNode.text.length,
    },
    focus: {
      path: lastNodePath,
      offset: lastNode.text.length,
    },
  });
  editor.removeNodes({ at: path });
  return true;
};
