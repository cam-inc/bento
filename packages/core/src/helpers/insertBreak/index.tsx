import { Editor, Element, NodeEntry, Range, Text } from 'slate';
import { Config } from '../../config';

export const defaultElementInsertBreak = (
  editor: Editor,
  nodeEntry: NodeEntry,
  config: Config
): boolean => {
  const { selection } = editor;
  if (!selection) {
    return false;
  }

  const currentElement = nodeEntry[0];
  if (!Element.isElement(currentElement)) {
    return false;
  }

  const pointStart = Range.end(selection);
  const [node, path] = Editor.node(editor, pointStart);
  const firstNode = currentElement.children[0];
  if (!Text.isText(firstNode) || !Text.isText(node)) {
    return false;
  }

  const afterText = editor.string({
    anchor: pointStart,
    focus: editor.end(path),
  });
  if (!Text.isText(firstNode)) {
    return false;
  }

  const isFirst = !pointStart || afterText === firstNode.text;
  editor.splitNodes({ always: true });
  if (isFirst) {
    editor.setNodes(
      { type: config.defaultElement.type },
      { at: [selection.anchor.path[0]] }
    );
  } else {
    editor.setNodes({
      type: config.defaultElement.type,
    });
  }
  return true;
};
