import { css, injectGlobal } from '@emotion/css';
import React, { useCallback, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BaseEditor, createEditor, Descendant } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { Editable, EditableProps } from '../editable';
import { ElementWrapper } from '../elementWrapper';
import { Default, DefaultElement } from '../default';
import { Toolbar } from '../toolbar';


import { Paragraph, ParagraphElement } from '../../paragraph';
import { Heading, HeadingElement } from '../../heading';
import { Bold, BoldLeaf } from '../../bold';

injectGlobal`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;

// @see: https://docs.slatejs.org/concepts/12-typescript#why-is-the-type-definition-unusual
type CustomElement = DefaultElement | ParagraphElement | HeadingElement;
type CustomText = BoldLeaf;
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

type Value = Descendant[];
export type EditorProps = {
  initialValue: Value;
};
export const Editor: React.FC<EditorProps> = ({ initialValue }) => {
  const editor = useMemo(() => {
    return withReact(createEditor());
  }, []);

  const handleChange = useCallback((value: Value) => {
    console.log('Slate[onChange]', value);
  }, []);

  const renderElement = useCallback<EditableProps['renderElement']>((props) => {
    // TODO: refactorしてシンプルにかく。
    const element = (() => {
      switch (props.element.type) {
        case 'paragraph':
          return (
            <Paragraph element={props.element}>
              {props.children}
            </Paragraph>
          );
        case 'heading':
          return (
            <Heading element={props.element}>
              {props.children}
            </Heading>
          );
        default:
          return (
            <Default element={props.element}>
              {props.children}
            </Default>
          );
      }
    })();
    return (
      <ElementWrapper {...props}>
        {element}
      </ElementWrapper>
    );
  }, []);

  const renderLeaf = useCallback<EditableProps['renderLeaf']>((props) => {
    switch (props.leaf.type) {
      case 'bold':
        return (
          <Bold {...props} />
        );
      default:
        return (
          <span {...props.attributes}>{props.children}</span>
        );
    }
  }, []);

  return (
    <div className={css({
      padding: '4px',
      border: '2px solid gray'
    })}>
      <Slate editor={editor} value={initialValue} onChange={handleChange}>
        <DndProvider backend={HTML5Backend}>
          <Toolbar />
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </DndProvider>
      </Slate>
    </div>
  );
};
