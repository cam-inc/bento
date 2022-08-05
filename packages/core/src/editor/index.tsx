import React, { useCallback, useMemo } from 'react';
import { BaseEditor, createEditor } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { Editable, EditableProps } from '../editable';
import { /*themeClass,*/ exampleStyle } from './index.css';

// @see: https://docs.slatejs.org/concepts/12-typescript#why-is-the-type-definition-unusual
//type CustomElement = { type: 'paragraph' }
//type CustomText = { type: 'foo' }
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    //    Element: CustomElement;
    //    Text: CustomText;
  }
}

// `SlateProps` is not exported from `slate-react`.
// Below is just a workaround of this.
type SlateProps = React.ComponentProps<typeof Slate>;

export type EditorProps = {
  initialValue: SlateProps['value'];
};
export const Editor: React.FC<EditorProps> = ({ initialValue }) => {
  const editor = useMemo(() => {
    return withReact(createEditor());
  }, []);

  const handleChange = useCallback<NonNullable<SlateProps['onChange']>>((value) => {
    console.log('Slate[onChange]', value);
  }, []);

  const renderElement = useCallback<EditableProps['renderElement']>((props) => {
    return (
      <div {...props.attributes}>{props.children}</div>
    );
  }, []);

  const renderLeaf = useCallback<EditableProps['renderLeaf']>((props) => {
    return (
      <span {...props.attributes}>{props.children}</span>
    );
  }, []);

  return (
    <Slate editor={editor} value={initialValue} onChange={handleChange}>
      <div className={exampleStyle}>
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
      </div>
    </Slate>
  );
};
