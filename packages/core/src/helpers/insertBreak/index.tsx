import { Text, Element } from 'slate';
import { InsertBreak } from '../../config';

export const copyInsertBreak: InsertBreak = (editor, entry) => {
  const { selection } = editor;
  if (!selection) {
    return false;
  }

  const [currentElement, path] = entry;
  if (!Element.isElement(currentElement)) {
    editor.splitNodes({ always: true });
    return true;
  }
  const node = currentElement.children[0];
  if (!Text.isText(node)) {
    editor.splitNodes({ always: true });
    return true;
  }
  if (node.text === '') {
    editor.move({ unit: 'line', reverse: true });
    editor.removeNodes({ at: path });
    return true;
  }
  editor.splitNodes({ always: true });

  return true;
};
