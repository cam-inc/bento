import { css } from '@emotion/css';
import React from 'react';
import { BaseText } from 'slate';

export type FormatText = BaseText & {
  type: 'format';
  bold?: boolean;
  italic?: boolean;
};
export type FormatProps = {
  text: FormatText;
  children: React.ReactNode;
};
export const Format: React.FC<FormatProps> = ({ text, children }) => {
  return (
    <span className={css({
      fontWeight: text.bold ? 'bold' : 'normal',
      fontStyle: text.italic ? 'italic' : 'normal'
    })}>{children}</span>
  );
};
