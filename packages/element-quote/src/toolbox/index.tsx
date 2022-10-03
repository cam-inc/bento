import { Element } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M15 17L17 13H13V6H20V13L18 17H15ZM6 17L8 13H4V6H11V13L9 17H6Z" fill="currentColor" />
      </svg>
    );
  },
  Thumb: () => {
    return (
      <div className={styles.thumb}>Quote</div>
    );
  },
  title: '引用',
  description: '引用を作成します。',
};
export default toolbox;
