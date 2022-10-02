import { Element } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M3 21V20H21V21H3Z" fill="currentColor" />
        <path d="M3 4V3H21V4H3Z" fill="currentColor" />
        <path d="M3 13V11H21V13H3Z" fill="currentColor" />
      </svg>
    );
  },
  Thumb: () => {
    return (
      <div className={styles.thumb}>Divider</div>
    );
  },
  title: 'ディバイダー',
  description: '区切り線を設置します。',
};
export default toolbox;
