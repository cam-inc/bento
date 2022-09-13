import { Element } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 18 12">
        <path d="M6 12V10H18V12H6ZM6 7V5H18V7H6ZM0 2V0H18V2H0Z" fill="currentColor" />
      </svg>
    );
  },
  Thumb: () => {
    return (
      <div className={styles.thumb}>
        吾輩は猫である。名前はまだ無い。どこで生れたか頓と見當がつかぬ。
      </div>
    );
  },
  title: '段落',
  description: 'プレーンテキストを入力できます。',
};
export default toolbox;
