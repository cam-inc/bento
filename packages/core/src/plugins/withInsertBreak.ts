import { Element } from 'slate';
import { Editor, Range, Text } from 'slate';
import { EditorPlugin } from '.';

export const withInsertBreak: EditorPlugin = (editor, config) => {
  const originalInsertBreak = editor.insertBreak;

  // @see: https://docs.slatejs.org/api/nodes/editor#insertbreak-greater-than-void
  editor.insertBreak = () => {
    const { selection } = editor;
    if (selection) {
      if (Range.isCollapsed(selection)) {
        const [match] = Editor.nodes(editor, {
          match: (n) => !Editor.isEditor(n) && Element.isElement(n),
          mode: 'lowest',
        });

        if (match) {
          const [node] = match;
          if (Element.isElement(node)) {
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
          }
        }
      }

      const currentElement = editor.children[selection.anchor.path[0]];
      if (!Element.isElement(currentElement)) {
        return;
      }
      const elementType = currentElement.type;

      const isHeading = elementType?.includes('heading');
      const isText = isHeading || elementType === 'paragraph';
      if (isText) {
        const pointStart = Range.end(selection);
        const [node, path] = Editor.node(editor, pointStart);
        const lastNode =
          currentElement.children[currentElement.children.length - 1];
        const firstNode = currentElement.children[0];
        if (
          !Text.isText(lastNode) ||
          !Text.isText(firstNode) ||
          !Text.isText(node)
        ) {
          return;
        }

        const isLastNode = node.text === lastNode.text;
        const afterText = editor.string({
          anchor: pointStart,
          focus: editor.end(path),
        });
        const isEnd = !pointStart || (!afterText && isLastNode);
        if (!Text.isText(firstNode)) {
          return;
        }
        const isFirst = !pointStart || afterText === firstNode.text;

        if (!isEnd) {
          originalInsertBreak();
          if (isFirst) {
            editor.setNodes(
              { type: config.defaultElement.type },
              { at: [selection.anchor.path[0]] }
            );
            return;
          }
          if (!isHeading) {
            return;
          }
          editor.setNodes({
            type: config.defaultElement.type,
          });
          return;
        }

        editor.insertNode({
          type: config.defaultElement.type,
          children: [{ type: 'format', text: '' }],
        });
        return;
      }
    }
    originalInsertBreak();
  };
  return editor;
};
