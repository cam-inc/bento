import { Editor, Element, Node, NodeEntry } from 'slate';
import { warn } from '../logger';

/**
 *  Delete child of type other than received in argument.
 */
export const nestedElementNormalizeNode = (
  editor: Editor,
  entry: NodeEntry,
  allowType: string | string[]
) => {
  let isRestricted: boolean = false;
  const [node, path] = entry;
  allowType = Array.isArray(allowType) ? allowType : [allowType];
  const childEntryList = Array.from(Node.children(editor, path));
  const childNodes = childEntryList.map((entry) => {
    const [node] = entry;
    return node;
  });
  const hasCurrentTypeChild = !!childNodes.find((child) => {
    if (!Element.isElement(child)) {
      return false;
    }
    return allowType.includes(child.type);
  });
  if (!hasCurrentTypeChild) {
    editor.removeNodes({ at: path });
    return true;
  }

  childEntryList.forEach((childEntry) => {
    const [child, childPath] = childEntry;
    if (!Element.isElement(child) || !allowType.includes(child.type)) {
      warn({
        messages: [
          'Element removed.',
          {
            from: [node, path],
            target: [child, childPath],
          },
        ],
      });
      editor.removeNodes({
        at: childPath,
      });
      isRestricted = true;
    }
  });

  return isRestricted;
};
