import React, { useCallback, useEffect, useMemo } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BaseEditor, createEditor } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { Config } from '../config';
import { Editable, EditableProps } from '../editable';
import { Modal, useModal } from '../portals/modal';
import { ModalContainer } from '../portals/modal/container';
import { PopoverContainer } from '../portals/popover/container';
import { GlobalStateProvider, useConfigGlobalStateSet, useScreenGlobalStateSet } from '../store';
import { TextToolbar } from '../textToolbar';
import { debounce } from '../utils';
import { /*themeClass,*/ styles } from './index.css';

// @see: https://docs.slatejs.org/concepts/12-typescript#why-is-the-type-definition-unusual
type CustomElement = { type: string };
type CustomText = { type: string }
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
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

  return (
    <>
      <Slate editor={editor} value={initialValue} onChange={handleChange}>
        <GlobalStateProvider>
          <DndProvider backend={HTML5Backend}>
            {/* Need to wrap with a react component to encapsulate all state related processes inside the RecoilRoot component. */}
            <Root config={config} />
          </DndProvider>
        </GlobalStateProvider>
      </Slate>
    </>
  );
};

type RootProps = {
  config: Config;
};
const Root: React.FC<RootProps> = ({ config }) => {
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
    const { texts } = config;
    const text = texts.find((text) => {
      return text.type === props.text.type;
    })
    if (text) {
      return (
        <text.Component {...props}>{props.children}</text.Component>
      );
    } else {
      return (
        <span {...props.attributes}>{props.children}</span>
      );
    }
  }, []);

  const setConfig = useConfigGlobalStateSet();
  useEffect(() => {
    setConfig(config);
  }, [config]);

  const setScreen = useScreenGlobalStateSet();
  // Watch screen size.
  useEffect(() => {
    const handler = () => {
      const { innerWidth, innerHeight } = window;
      setScreen((currVal) => {
        return {
          ...currVal,
          width: innerWidth,
          height: innerHeight,
        };
      });
    };
    handler();
    const debouncedHander = debounce(handler, 1000);
    // TODO: windowではなくroot要素に。
    window.addEventListener('resize', debouncedHander, {
      passive: true,
    });
    // A cleanup function.
    return () => {
      window.removeEventListener('resize', debouncedHander);
    };
  }, [setScreen]);

  const modal = useModal();
  const handleModalOpenerClick = useCallback(() => {
    modal.open();
  }, [modal]);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </div>
        <ModalContainer />
        <PopoverContainer />
      </div>
      <TextToolbar />
      <button onClick={handleModalOpenerClick}>open odal</button>
      <Modal {...modal.bind}>hello</Modal>
    </>
  );
};
