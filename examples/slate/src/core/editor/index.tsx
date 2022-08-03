import { css, injectGlobal } from '@emotion/css';
import React, { useCallback, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BaseEditor, createEditor, Descendant } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { Editable, EditableProps } from '../editable';
import { ElementWrapper } from '../elementWrapper';
import { TextWrapper } from '../textWrapper';
import { Toolbar } from '../toolbar';

// TODO: 使用者側から受け取るように。
import { Container, ContainerElement } from '../../container';
import { ContainerItem, ContainerItemElement } from '../../container/item';
import { Paragraph, ParagraphElement } from '../../paragraph';
import { Heading, HeadingElement } from '../../heading';
import { Format, FormatText } from '../../format';
import { Emoji, EmojiText } from '../../emoji';

injectGlobal`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;

// @see: https://docs.slatejs.org/concepts/12-typescript#why-is-the-type-definition-unusual
type CustomElement = ParagraphElement | HeadingElement;
type CustomText = FormatText | EmojiText;
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
        case 'container':
          return (
            <Container element={props.element}>
              {props.children}
            </Container>
          );
        case 'container-item':
          return (
            <ContainerItem element={props.element}>
              {props.children}
            </ContainerItem>
          );
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
            <div>
              {props.children}
            </div>
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
    // TODO: refactorしてシンプルにかく。
    const text = (() => {
      switch (props.text.type) {
        case 'format':
          return (
            <Format text={props.text}>
              {props.children}
            </Format>
          );
        case 'emoji':
          return (
            <Emoji text={props.text} />
          );
        default:
          return (
            <span>
              {props.children}
            </span>
          );
      }
    })();
    return (
      <TextWrapper {...props}>
        {text}
      </TextWrapper>
    );
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
