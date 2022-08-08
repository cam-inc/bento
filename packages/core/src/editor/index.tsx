import React, { useCallback, useMemo } from 'react';
import { BaseEditor, createEditor } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { Config } from '../config';
import { Editable, EditableProps } from '../editable';
import { Modal, useModal } from '../portals/modal';
import { ModalContainer } from '../portals/modal/container';
import { Toolbar } from '../toolbar';
import { /*themeClass,*/ styles } from './index.css';

// @see: https://docs.slatejs.org/concepts/12-typescript#why-is-the-type-definition-unusual
type CustomElement = { type: string };
//type CustomText = { type: 'foo' }
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    //    Text: CustomText;
  }
}

// `SlateProps` is not exported from `slate-react`.
// Below is just a workaround of this.
type SlateProps = React.ComponentProps<typeof Slate>;

export type EditorProps = {
  initialValue: SlateProps['value'];
  config: Config;
};
export const Editor: React.FC<EditorProps> = ({ initialValue, config }) => {
  const editor = useMemo(() => {
    return withReact(createEditor());
  }, []);

  const handleChange = useCallback<NonNullable<SlateProps['onChange']>>((value) => {
    console.log('Slate[onChange]', value);
  }, []);

  const renderElement = useCallback<EditableProps['renderElement']>((props) => {
    const { elements } = config;
    const element = elements.find((element) => {
      return element.type === props.element.type;
    })
    if (element) {
      return (
        <element.Component {...props}>{props.children}</element.Component>
      );
    } else {
      return (
        <div {...props.attributes}>{props.children}</div>
      );
    }

  }, [config]);

  const renderLeaf = useCallback<EditableProps['renderLeaf']>((props) => {
    return (
      <span {...props.attributes}>{props.children}</span>
    );
  }, []);

  const modal = useModal();
  const handleModalOpenerClick = useCallback(() => {
    modal.open();
  }, [modal]);

  return (
    <>
      <Slate editor={editor} value={initialValue} onChange={handleChange}>
        <div className={styles.container}>
          <ModalContainer />
          <div>
            <Toolbar config={config} />
            <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
          </div>
        </div>
      </Slate>
      <button onClick={handleModalOpenerClick}>open odal</button>
      <Modal {...modal.bind}>hello</Modal>
    </>
  );
};
