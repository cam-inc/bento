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
export const copyAndTextEmptyRemoveInsertBreak: NodeFunction = (
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
    editor.move({ unit: 'line', reverse: true });
    editor.removeNodes({ at: currentPath });
    return true;
  }
  editor.splitNodes({ always: true });

  return true;
};
