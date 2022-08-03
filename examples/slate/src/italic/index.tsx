import { css } from '@emotion/css';
import React from 'react';
import { BaseText } from 'slate';

export type ItalicText = BaseText & {
  type: 'italic';
  active?: boolean;
};
export type ItalicProps = {
  text: ItalicText;
  children: React.ReactNode;
};
export const Italic: React.FC<ItalicProps> = ({ text, children }) => {
  return (
    <span className={css({
      fontStyle: text.active ? 'italic' : 'normal'
    })}>{children}</span>
  );
};
