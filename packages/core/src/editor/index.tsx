import React, { useEffect, useMemo } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BaseEditor, createEditor } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { Config } from '../config';
import { Editable } from '../editable';
import { ModalContainer } from '../portals/modal/container';
import { PopoverContainer } from '../portals/popover/container';
import { COLOR_SCHEME, GlobalStateProvider, useColorSchemeGlobalStateSet, useConfigGlobalStateSet, useScreenGlobalStateSet } from '../store';
import { Theme } from '../theme';
import { Toolbar } from '../toolbar';
import { debounce } from '../utils';
import { styles } from './index.css';

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
  config: Config;
  initialValue: SlateProps['value'];
  onChange: NonNullable<SlateProps['onChange']>;
};
export const Editor: React.FC<EditorProps> = ({ config, initialValue, onChange }) => {
  const editor = useMemo(() => {
    return withReact(createEditor());
  }, []);

  return (
    <>
      <Slate editor={editor} value={initialValue} onChange={onChange}>
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
  const setColorScheme = useColorSchemeGlobalStateSet();
  // Watch `prefers-color-scheme`.
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setColorScheme(e.matches ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT);
    });
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

  return (
    <Theme token={config.themeToken} render={(style) => (
      <>
        <div className={styles.root} style={style}>
          <div className={styles.container}>
            <Editable />
          </div>
          <ModalContainer />
          <PopoverContainer />
        </div>
        <Toolbar />
      </>
    )} />
  );
};
