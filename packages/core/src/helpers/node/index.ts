import {
  Editor,
  Element,
  Node,
  NodeEntry,
  Node as SlateNode,
  Text,
} from 'slate';

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

  const parentEntry = editor.parent(nextPath);
  const textNodeEntryList = Array.from(Node.texts(parentEntry[0]));
  const lastNodeEntry = textNodeEntryList.at(-1);
  if (!lastNodeEntry?.length) {
    return;
  }

  const [lastNode, lastPath] = lastNodeEntry;
  if (!Text.isText(lastNode)) {
    return;
  }

  const endLinePosition = {
    path: [...nextPath.slice(0, nextPath.length - 1), lastPath[0]],
    offset: lastNode.text.length,
  };
  editor.setSelection({
    anchor: endLinePosition,
    focus: endLinePosition,
  });
  editor.removeNodes({ at: path });
};
