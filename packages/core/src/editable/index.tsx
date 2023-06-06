import { KeyboardEventHandler, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Editable as SlateReactEditable,
  useSlate,
  ReactEditor,
} from 'slate-react';
import { useConfigGlobalStateValue } from '../store';
import { styles } from './index.css';
import { Editor, Range, Element, Text } from 'slate';

// `EditableProps` is not exported from `slate-react`.
// Below is just a workaround of this.
type SlateReactEditableProps = React.ComponentProps<typeof SlateReactEditable>;

export type EditableProps = {};
export const Editable: React.FC<EditableProps> = () => {
  const config = useConfigGlobalStateValue();
  const editor = useSlate();

  const renderElement = useCallback<
    NonNullable<SlateReactEditableProps['renderElement']>
  >(
    (props) => {
      const { elements } = config;
      const element = elements.find((element) => {
        return element.type === props.element.type;
      });

      if (element) {
        const path = ReactEditor.findPath(editor, props.element);
        return (
          <element.editable.Component {...props} editor={editor} path={path}>
            {props.children}
          </element.editable.Component>
        );
      } else {
        return <div {...props.attributes}>{props.children}</div>;
      }
    },
    [config]
  );

  const renderLeaf = useCallback<
    NonNullable<SlateReactEditableProps['renderLeaf']>
  >(
    (props) => {
      const { texts } = config;
      const text = texts.find((text) => {
        return text.type === props.text.type;
      });
      if (text) {
        const path = ReactEditor.findPath(editor, props.text);
        return (
          <text.editable.Component {...props} editor={editor} path={path}>
            {props.children}
          </text.editable.Component>
        );
      } else {
        return <span {...props.attributes}>{props.children}</span>;
      }
    },
    [config]
  );

  // `react-dnd` and `slate-react` don't work well each other.
  // Override the default `drop` handler to skip its own logic.
  // @see: https://docs.slatejs.org/libraries/slate-react#event-handling
  const handleDrop = useCallback(() => {
    return true;
  }, []);

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { selection } = editor;
      if (!selection) {
        return;
      }

      const currentNode = editor.children[selection.anchor.path[0]];
      if (!Element.isElement(currentNode)) {
        return;
      }
      const nodeType = currentNode.type;
      const isText = nodeType?.includes('heading') || nodeType === 'paragraph';
      if (!isText) {
        editor.insertBreak();
        return;
      }

      const pointStart = Range.end(selection);
      const [node, path] = Editor.node(editor, pointStart);
      const lastNode = currentNode.children[currentNode.children.length - 1];
      if (!Text.isText(lastNode) || !Text.isText(node)) {
        return;
      }

      const isLastNode = node.text === lastNode.text;
      const isEnd =
        !pointStart ||
        (!Editor.string(editor, {
          anchor: pointStart,
          focus: Editor.end(editor, path),
        }) &&
          isLastNode);

      if (!isEnd) {
        editor.insertBreak();
        return;
      }

      editor.insertNode({
        type: 'paragraph',
        children: [{ type: 'format', text: '' }],
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <SlateReactEditable
        className={styles.root}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        placeholder={config.rootPlaceholder}
      />
    </DndProvider>
  );
};
