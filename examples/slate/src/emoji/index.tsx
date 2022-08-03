import { css } from '@emotion/css';
import React, { useMemo } from 'react';
import { BaseText } from 'slate';

export type EmojiText = BaseText & {
  type: 'emoji';
  code: 'smile' | 'sad'
};
export type EmojiProps = {
  text: EmojiText;
};
export const Emoji: React.FC<EmojiProps> = ({ text }) => {
  const elm = useMemo(() => {
    switch (text.code) {
      case 'smile':
        return '😀';
      case 'sad':
        return '🥲';
    }
  }, [text.code]);
  return (
    <span contentEditable={false} className={css({
      backgroundColor: 'lightgray'
    })}>{elm}</span>
  );
};
