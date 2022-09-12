import { Element } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 14 10">
        <path d="M0 10V0H2V4H6V0H8V10H6V6H2V10H0ZM12 10V2H10V0H14V10H12Z" fill="currentColor" />
      </svg>
    );
  },
  Thumb: () => {
    return (
      <div className={styles.thumb}>Heading</div>
    );
  },
  // TODO: 上書き可能に。
  title: '見出し',
  description: 'セクションを設定します。',
};
export default toolbox;
