/**
 * Currently, type definitions in @emoji-mart/react is't perfect, so we implement our own.
 * ref. https://github.com/missive/emoji-mart/issues/576
 */
import { useRef, useEffect } from 'react';
import { Picker, PickerProps, Emoji as EmojiBaseType } from 'emoji-mart';
import { styles } from './index.css';
import i18n from '@emoji-mart/data/i18n/ja.json';
import { themeVars } from '@bento-editor/core';

export type Emoji = typeof EmojiBaseType.Props;

declare module 'emoji-mart' {
  interface Category {
    id: string;
    name: string;
    emojis: string[];
  }

  interface Data {
    compressed: boolean;
    categories: Category[];
    emojis: { [key: string]: Emoji };
    aliases: { [key: string]: string };
  }

  interface PickerProps {
    data: Data;
    onEmojiSelect: (emoji: Emoji) => void;
    onClickOutside: () => void;
    navPosition: 'top' | 'bottom' | 'none';
    previewPosition: 'top' | 'bottom' | 'none';
    skinTonePosition: 'top' | 'bottom' | 'none';
  }

  interface BaseEmoji {
    id: string;
    name: string;
    colons: string;
    /** Reverse mapping to keyof emoticons */
    emoticons: string[];
    unified: string;
    skin: 1 | 2 | 3 | 4 | 5 | 6 | null;
    native: string;
  }
}

type EmojiPickerProps = PickerProps;

export const EmojiPicker: React.FC<EmojiPickerProps> = (props) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const pickerInstance = useRef<Picker | null>(null);

  if (pickerInstance.current) {
    pickerInstance.current.update(props);
  }

  useEffect(() => {
    // Use dynamic import for surpressing the error related with SSR.
    // Refered: https://github.com/missive/emoji-mart/issues/575#issuecomment-1111323710
    import('emoji-mart').then((EmojiMart) => {
      pickerInstance.current = new EmojiMart.Picker({
        ...props,
        ref: pickerRef,
        i18n,
      });

      const styleElem = document.createElement('style');
      styleElem.innerHTML = `#root {
        --em-rgb-background: ${themeVars.color.background};
        --em-color-border: ${themeVars.color.background};

        border: solid 1px ${themeVars.color.backgroundOnSlight};
        background-color: ${themeVars.color.background};
      }

      .search {
        border: solid 1px ${themeVars.color.backgroundOnSlight};
        border-radius: ${themeVars.radius.small};
      }

      .spacer {
        height: ${themeVars.space[4]};
      }

      .sticky {
        font-weight: bold;
      }

      .padding-small {
        padding: ${themeVars.space[4]} var(--padding-small);
      }
      `;

      //@ts-expect-error For overriding #root selector.
      pickerInstance.current.shadowRoot.appendChild(styleElem);
    });

    return () => {
      pickerInstance.current = null;
    };
  }, []);

  return <div className={styles.root} ref={pickerRef} />;
};
