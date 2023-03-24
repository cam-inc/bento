import { Editor, Element, Node, NodeEntry, Transforms } from 'slate';
import { warn } from '../logger';

export const restrictedChildren = (
  editor: Editor,
  entry: NodeEntry,
  allowType: string | string[]
) => {
  let isRestricted: boolean = false;
  const [node, path] = entry;
  allowType = Array.isArray(allowType) ? allowType : [allowType];
  for (const [child, childPath] of Node.children(editor, path)) {
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
      Transforms.removeNodes(editor, {
        at: childPath,
      });
      isRestricted = true;
    }
  }
  return isRestricted;
};
