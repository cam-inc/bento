import { Editor, Element, NodeEntry, Node as SlateNode, Text } from 'slate';

export default SlateNode;

export const removeNode = (editor: Editor, entry: NodeEntry) => {
  const path = entry[1];
  const next = editor.next();
  if (!next) {
    editor.removeNodes({ at: path });
    return;
  }

  const [nextNode, nextPath] = next;
  if (Element.isElement(nextNode)) {
    if (editor.isVoid(nextNode)) {
      editor.removeNodes({ at: path });
      return;
    }
  }

  const parentPath = editor.parent(nextPath)[1];
  const textNodeEntryList = Array.from(
    editor.nodes({ at: parentPath, match: (node) => Text.isText(node) })
  );
  const lastNodeEntry = textNodeEntryList.at(-1);
  if (!lastNodeEntry?.length) {
    return;
  }

  const [lastNode, lastPath] = lastNodeEntry;
  if (!Text.isText(lastNode)) {
    return;
  }

  const endLinePosition = {
    path: lastPath,
    offset: lastNode.text.length,
  };
  editor.setSelection({
    anchor: endLinePosition,
    focus: endLinePosition,
  });
  editor.removeNodes({ at: path });
};
