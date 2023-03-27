import { useCallback, useEffect, useMemo } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact, ReactEditor } from 'slate-react';
import { Config, CustomElement } from '../config';
import { Editable } from '../editable';
import { helpers } from '../helpers';
import { withInsertBreak } from '../plugins/withInsertBreak';
import { withInsertSoftBreak } from '../plugins/withInsertSoftBreak';
import { withOriginalIsVoid } from '../plugins/withOriginalIsVoid';
import { withOriginalNormalizeNode } from '../plugins/withOriginalNormalizeNode';
import { ModalContainer } from '../portals/modal/container';
import { PopoverContainer } from '../portals/popover/container';
import {
  COLOR_SCHEME,
  GlobalStateProvider,
  useColorSchemeGlobalStateSet,
  useConfigGlobalStateSet,
  useScreenGlobalStateSet,
} from '../store';
import { Theme } from '../theme';
import { Toolbar } from '../toolbar';
import { debounce } from '../utils';
import { styles } from './index.css';

export const EditorClassName = styles.root;

export type BentoReturnData = {
  meta: {
    version: string;
  };
  elements: CustomElement[];
};

// `SlateProps` is not exported from `slate-react`.
// Below is just a workaround of this.
type SlateProps = React.ComponentProps<typeof Slate>;

export type EditorProps = {
  config: Config;
  // Rename to `initialvalue` for the <Slate> component's `value` props is only used as initial state for the editor.
  // @see:
  initialValue: CustomElement[];
  onChange?: (value: BentoReturnData) => void;
};
export const Editor: React.FC<EditorProps> = ({
  config,
  initialValue,
  onChange = () => {},
}) => {
  const editor = useMemo(() => {
    const baseEditor = withReact(withHistory(createEditor()));
    const editor = [
      withInsertBreak,
      withInsertSoftBreak,
      withOriginalIsVoid,
      withOriginalNormalizeNode,
    ].reduce((editor, plugin) => plugin(editor, config), baseEditor);

    return editor;
  }, [config]);

  const handleOnChange = useCallback<NonNullable<SlateProps['onChange']>>(
    (value) => {
      onChange({
        meta: {
          version: VERSION,
        },
        // Return custom elements array only
        elements: value as CustomElement[],
      });
    },
    []
  );

  useEffect(() => {
    !initialValue.length &&
      helpers.logger.error({
        messages: [`The initial value must have a child or more.`],
      });
    !verifyDefaultElement(config) &&
      helpers.logger.error({
        messages: [`The default element must be one of the given elements`],
      });
    ReactEditor.focus(editor);
  }, []);

  return (
    <Slate editor={editor} value={initialValue} onChange={handleOnChange}>
      <GlobalStateProvider>
        {/* Need to wrap with a react component to encapsulate all state related processes inside the RecoilRoot component. */}
        <Root config={config} />
      </GlobalStateProvider>
    </Slate>
  );
};

type RootProps = {
  config: Config;
};
const Root: React.FC<RootProps> = ({ config }) => {
  const setColorScheme = useColorSchemeGlobalStateSet();
  // Watch `prefers-color-scheme`.
  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(
      mediaQueryList.matches ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT
    );
    const handler = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT);
    };
    mediaQueryList.addEventListener('change', handler);
    return () => {
      mediaQueryList.removeEventListener('change', handler);
    };
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
    <Theme
      token={config.themeToken}
      render={(style) => (
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
      )}
    />
  );
};

const verifyDefaultElement = (config: Config) =>
  config.elements.some((e) => e.type === config.defaultElement.type);
