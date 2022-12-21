import { useCallback, useEffect, useMemo } from 'react';
import { createEditor, Element, Editor as SlateEditor, Range } from 'slate';
import { Slate, withReact, ReactEditor } from 'slate-react';
import { Config, CustomElement } from '../config';
import { Editable } from '../editable';
import { helpers } from '../helpers';
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
  config?: Config;
  // Rename to `initialvalue` for the <Slate> component's `value` props is only used as initial state for the editor.
  // @see:
  initialValue: CustomElement[];
  onChange?: (value: BentoReturnData) => void;
};
export const Editor: React.FC<EditorProps> = ({
  config = { elements: [], texts: [], themeToken: {} },
  initialValue,
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

    // @see: https://docs.slatejs.org/api/nodes/editor#editor.insertbreak-editor-editor-greater-than-void
    const originalInsertBreak = editor.insertBreak;
    editor.insertBreak = () => {
      const { selection } = editor;
      if (!selection || !Range.isCollapsed(selection)) {
        originalInsertBreak();
        return;
      }
      const [match] = SlateEditor.nodes(editor, {
        match: (n) => !SlateEditor.isEditor(n) && Element.isElement(n),
        mode: 'lowest',
      });
      if (match) {
        const [node] = match;
        if (Element.isElement(node)) {
          const { elements } = config;
          const element = elements.find((element) => {
            return element.type === node.type;
          });
          if (element && element.insertBreak) {
            const isToReturn = element.insertBreak(editor, match);
            if (isToReturn) {
              return;
            }
          }
        }
      }
      originalInsertBreak();
    };

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
