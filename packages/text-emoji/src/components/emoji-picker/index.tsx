/**
 * Currently, there are no type definitions in @emoji-mart/react, so we implement our own.
 */
import React from 'react';
import { styles } from './index.css';

type EmojiPickerProps = {
  searchString: string;
  selectEmoji: (emoji: any) => void;
};

type EmojiProps = {
  unicode: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const Emoji: React.FC<EmojiProps> = ({ onClick, unicode }) => {
  return (
    <button onClick={onClick}>
      <span>{unicode}</span>
    </button>
  );
};

export const EmojiPicker: React.FC<EmojiPickerProps> = () => {
  return <div className={styles.root}></div>;
};
