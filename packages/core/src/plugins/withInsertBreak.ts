import { Editor, Element } from 'slate';
import { helpers } from '../helpers';
import { EditorPlugin } from '.';

/**
 * Overrides the behavior of insertBreak.
 *
 * case1: original insertBreak is set.
 * action: execute original insertBreak.
 *
 * case2: string is empty And not default Element.
 * action: overwrite that line with the default Element.
 *
 * case3: enter is pressed at the beginning of a line.
 * action: insert the default Element at the line above.
 *
 * case4: enter is pressed in the line.
 * action: it will wrap the line and overwrite the default Element.
 *
 * case5: enter is pressed at the end of a line.
 * action: insert the default Element at the below.
 */
export const withInsertBreak: EditorPlugin = (editor, config) => {
  // @see: https://docs.slatejs.org/api/nodes/editor#insertbreak-greater-than-void
  editor.insertBreak = () => {
    const { selection } = editor;
    if (!selection) {
      return;
    }

    helpers.rangeHelpers.deleteRange(editor, selection);

    const [match] = editor.nodes<Element>({
      match: (n) => !Editor.isEditor(n) && Element.isElement(n),
      mode: 'lowest',
    });
    if (!match) {
      return;
    }

    const [node, path] = match;

    // case1: original insertBreak is set.
    const { elements } = config;
    const element = elements.find((element) => {
      return element.type === node.type;
    });
    if (element && element.insertBreak) {
      const isToReturn = element.insertBreak(editor, match, config);
      if (isToReturn) {
        return;
      }
    }

    // case2: string is empty And not default Element.
    if (editor.isEmpty(node) && node.type !== config.defaultElement.type) {
      editor.setNodes({
        type: config.defaultElement.type,
      });
      return;
    }

    // case3: enter is pressed at the beginning of a line.
    if (editor.isStart(selection.anchor, path)) {
      editor.splitNodes({ always: true });
      const previous = editor.previous({ match: (n) => Element.isElement(n) });
      if (!previous) {
        return;
      }
      const [_, previousPath] = previous;
      editor.setNodes(
        {
          type: config.defaultElement.type,
        },
        { at: previousPath }
      );
      return;
    }

    // case4: enter is pressed in the line.
    // case5: enter is pressed at the end of a line.
    editor.splitNodes({ always: true });
    editor.setNodes({
      type: config.defaultElement.type,
    });
    return;
  };
  return editor;
};
