import { Element } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

// TODO: toolboxに表示されないようにする。
const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M10 19L3 12L10 5V19ZM14 19V5L21 12L14 19ZM15.5 15.375L18.875 12L15.5 8.625V15.375Z" fill="currentColor" />
      </svg>
    );
  },
  Thumb: () => {
    return (
      <div className={styles.thumb}>Toggle Body</div>
    );
  },
  title: 'トグルbody',
  description: 'トグルを作成します。',
};
export default toolbox;
