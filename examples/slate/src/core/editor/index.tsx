import React, { useCallback, useMemo } from 'react';
import { BaseEditor, createEditor, Descendant } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { Editable, EditableProps } from '../editable';
import { Default, DefaultElement } from '../default';

import { Paragraph, ParagraphElement } from '../../paragraph';
import { Heading, HeadingElement } from '../../heading';
import { Bold, BoldLeaf } from '../../bold';

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
    switch (props.element.type) {
      case 'paragraph':
        return (
          <Paragraph {...props} />
        );
      case 'heading':
        return (
          <Heading {...props} />
        );
      default:
        return (
          <Default {...props} />
        );
    }
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
    <Slate editor={editor} value={initialValue} onChange={handleChange}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
};
