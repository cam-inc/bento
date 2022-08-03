import { css } from '@emotion/css';
import React from 'react';
import { BaseText } from 'slate';

export type BoldText = BaseText & {
  type: 'bold';
  active?: boolean;
};
export type BoldProps = {
  text: BoldText;
  children: React.ReactNode;
};
export const Bold: React.FC<BoldProps> = ({ text, children }) => {
  return (
    <span className={css({
      fontWeight: text.active ? 'bold' : 'normal'
    })}>{children}</span>
  );
};
