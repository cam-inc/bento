/**
 * Currently, there are no type definitions in @emoji-mart/react, so we implement our own.
 * ref. https://github.com/missive/emoji-mart/blob/665a58031c7b5b753c06e8581dcfe51741098275/packages/emoji-mart-react/react.js
 */
import React, { useRef, useEffect } from 'react';
import { Data, Picker, PickerProps, BaseEmoji } from 'emoji-mart';
import { styles } from './index.css';

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
    });

    return () => {
      pickerInstance.current = null;
    };
  }, []);

  return <div className={styles.root} ref={pickerRef} />;
};
