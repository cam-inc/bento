/**
 * Currently, there are no type definitions in @emoji-mart/react, so we implement our own.
 */
import React from 'react';
import { Picker, PickerProps } from 'emoji-mart';
import data from '@emoji-mart/data';
import i18n from '@emoji-mart/data/i18n/ja.json';

declare module 'emoji-mart' {
  export class Picker {
    constructor(
      _params: PickerProps & {
        data: typeof data;
        ref?: HTMLElement;
      }
    );
    update(props: PickerProps): void;
  }

  interface PickerProps {
    onEmojiSelect: () => void;
  }
}

type Props = PickerProps;

export const EmojiPicker: React.FC<Props> = (props) => {
  const onElementLoaded = (ref: HTMLDivElement | null) => {
    const picker = new Picker({
      ...props,
      data,
      i18n,
    });

    // Inspired: https://github.com/missive/emoji-mart/tree/main#browser
    // `ref.children.length < 1` suppresses to create multiple elements include the picker.
    if (ref != null && ref.children.length < 1) {
      // The picker should be HTMLDivElement.
      ref.appendChild(picker as unknown as HTMLElement);
    }
  };

  return <div ref={onElementLoaded} />;
};
