import { useCallback, useEffect, useMemo } from 'react';
import { createEditor, Descendant, Element } from 'slate';
import { Slate, withReact, ReactEditor } from 'slate-react';
import { Config } from '../config';
import { Editable } from '../editable';
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

declare const VERSION: string;
export const EditorClassName = styles.root;

// `SlateProps` is not exported from `slate-react`.
// Below is just a workaround of this.
type SlateProps = React.ComponentProps<typeof Slate>;

export type EditorProps = {
  config?: Config;
  // Rename to `initialvalue` for the <Slate> component's `value` props is only used as initial state for the editor.
  // @see:
  initialValue?: SlateProps['value'];
  onChange?: (value: { version: string; elements: Descendant[] }) => void;
};
export const Editor: React.FC<EditorProps> = ({
  config = { elements: [], texts: [], themeToken: {} },
  initialValue = [
    {
      children: [{ text: '' }],
    },
  ],
  onChange = () => {},
}) => {
  const editor = useMemo(() => {
    const editor = withReact(createEditor());

    // Set domain specific constraints.
    // @see: https://docs.slatejs.org/concepts/11-normalizing
    const originalNormalizeNode = editor.normalizeNode;
    editor.normalizeNode = (entry) => {
      const [node] = entry;
      if (Element.isElement(node)) {
        const { elements } = config;
        const element = elements.find((element) => {
          return element.type === node.type;
        });
        if (element && element.normalizeNode) {
          const isToReturn = element.normalizeNode(editor, entry);
          if (isToReturn) {
            // @see: https://docs.slatejs.org/concepts/11-normalizing#multi-pass-normalizing
            return;
          }
        }
      }
      // Fall back to the original `normalizeNode` to enforce other constraints.
      originalNormalizeNode(entry);
    };

    // Set non-void or void setting.
    const originalIsVoid = editor.isVoid;
    editor.isVoid = (elementNode) => {
      const { elements } = config;
      const element = elements.find((element) => {
        return element.type === elementNode.type;
      });
      if (element && element.isVoid) {
        return true;
      }
      return originalIsVoid(elementNode);
    };

    return editor;
  }, [config]);

  const handleOnChange = useCallback<NonNullable<SlateProps['onChange']>>(
    (value) => {
      onChange({
        version: 'v10',
        elements: value,
      });
    },
    []
  );

  useEffect(() => {
    ReactEditor.focus(editor);
  }, []);

  return (
    <>
      <Slate editor={editor} value={initialValue} onChange={handleOnChange}>
        <GlobalStateProvider>
          {/* Need to wrap with a react component to encapsulate all state related processes inside the RecoilRoot component. */}
          <Root config={config} />
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
