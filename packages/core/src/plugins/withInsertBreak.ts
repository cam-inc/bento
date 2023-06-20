import { Element, Range } from 'slate';
import { Editor } from 'slate';
import { EditorPlugin } from '.';
import { helpers } from '../helpers';

/**
 * Overrides the behavior of insertBreak.
 *
 * case1: original insertBreak is set.
 * action: execute original insertBreak.
 *
 * case2: enter is pressed at the beginning of a line.
 * action: insert the default Element at the line above.
 *
 * case3: enter is pressed in the line.
 * action: it will wrap the line and overwrite the default Element.
 *
 * case4: enter is pressed at the end of a line.
 * action: insert the default Element at the below.
 *
 * case5: string is empty.
 * action: overwrite that line with the default Element.
 */
export const withInsertBreak: EditorPlugin = (editor, config) => {
  // @see: https://docs.slatejs.org/api/nodes/editor#insertbreak-greater-than-void
  editor.insertBreak = () => {
    const { selection } = editor;
    if (!selection) {
      return;
    }

    helpers.rangeHelpers.deleteRange(editor, selection);

    const [match] = editor.nodes({
      match: (n) => !Editor.isEditor(n) && Element.isElement(n),
      mode: 'lowest',
    });
    if (!match) {
      return;
    }

    const [node] = match;
    if (!Element.isElement(node)) {
      return;
    }

    // when there is an original insertBreak
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

    // when text is empty
    if (
      helpers.textHelpers.isEmpty(node) &&
      node.type !== config.defaultElement.type
    ) {
      editor.setNodes({
        type: config.defaultElement.type,
      });
      return;
    }

    editor.splitNodes({ always: true });

    // When the cursor is at the beginning of the line
    const pointStart = Range.start(selection);
    const isFirst = pointStart.path[1] === 0 && pointStart.offset === 0;
    if (isFirst) {
      editor.setNodes(
        {
          type: config.defaultElement.type,
        },
        { at: [selection.anchor.path[0]] }
      );
      return;
    }

    editor.setNodes({
      type: config.defaultElement.type,
    });
    return;
  };
  return editor;
};
