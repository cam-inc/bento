import { Text, Element } from 'slate';
import { NodeFunction } from '../../config';

/**
 * Inherit the type of the current Element when you press enter.
 */
export const copyInsertBreak: NodeFunction = (editor, entry) => {
  const [currentNode] = entry;
  if (!Element.isElement(currentNode)) {
    editor.splitNodes({ always: true });
    return true;
  }
  editor.splitNodes({ always: true });
  return true;
};

/**
 * Inherit the type of the current Element when you press enter.
 * If the text is empty, remove the Element.
 */
export const copyAndRemoveTextEmptyInsertBreak: NodeFunction = (
  editor,
  entry
) => {
  const [currentNode, currentPath] = entry;
  if (!Element.isElement(currentNode)) {
    editor.splitNodes({ always: true });
    return true;
  }
  const textList = Array.from(
    editor.nodes({
      at: currentPath,
      match: (node) => Text.isText(node),
    })
  ).map((node) => (Text.isText(node[0]) ? node[0].text : ''));
  const isTextEmpty = !textList.join();

  if (isTextEmpty) {
    editor.removeNodes({ at: currentPath });
    const next = editor.next();
    if (!next) {
      return false;
    }
    const nextPath = next[1];
    const parent = editor.parent(nextPath);
    const textList = Array.from(
      editor.nodes({
        at: parent[1],
        match: (node) => Text.isText(node),
      })
    );
    const [lastNode, lastNodePath] = textList[textList.length - 1];
    if (!Text.isText(lastNode)) {
      return false;
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
    return true;
  }
  editor.splitNodes({ always: true });

  return true;
};
