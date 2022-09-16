/**
 * Currently, there are no type definitions in @emoji-mart/react, so we implement our own.
 * ref. https://github.com/missive/emoji-mart/blob/665a58031c7b5b753c06e8581dcfe51741098275/packages/emoji-mart-react/react.js
 */
import React, { useRef, useEffect } from 'react';
import { Data, Picker, PickerProps, BaseEmoji } from 'emoji-mart';
import { styles } from './index.css';
import i18n from '@emoji-mart/data/i18n/ja.json';
import { themeVars } from '@bento-editor/core';

export type Emoji = Data['emojis'][number] & BaseEmoji;

declare module 'emoji-mart' {
  export class Picker {
    constructor(
      _params: PickerProps & {
        data: Data;
        ref?: React.RefObject<HTMLElement>;
      }
    );
    update(props: PickerProps): void;
  }

  interface PickerProps {
    data: Data;
    onEmojiSelect: (emoji: Emoji) => void;
    onClickOutside: () => void;
    navPosition: 'top' | 'bottom' | 'none';
    previewPosition: 'top' | 'bottom' | 'none';
    skinTonePosition: 'top' | 'bottom' | 'none';
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
    pickerInstance.current = new Picker({
      ...props,
      ref: pickerRef,
      i18n,
    });

    const styleElem = document.createElement('style');
    styleElem.innerHTML = `#root {
      --em-rgb-background: ${themeVars.color.background};
      --em-color-border: ${themeVars.color.background};
    
      border: solid 1px ${themeVars.color.backgroundOnSlight};
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

    return () => {
      pickerInstance.current = null;
    };
  }, []);

  return <div className={styles.root} ref={pickerRef} />;
};
