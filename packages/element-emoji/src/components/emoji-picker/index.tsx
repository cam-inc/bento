/**
 * Currently, there are no type definitions in @emoji-mart/react, so we implement our own.
 */
import React from 'react';
import { Picker, PickerProps } from 'emoji-mart';

declare module 'emoji-mart' {
  export class Picker {
    constructor(
      _params: PickerProps & {
        data: Record<string, any>;
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
      // https://github.com/missive/emoji-mart/tree/main#fetched-remotely
      data: async () => {
        const response = await fetch(
          'https://cdn.jsdelivr.net/npm/@emoji-mart/data'
        );
        return response.json();
      },
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
