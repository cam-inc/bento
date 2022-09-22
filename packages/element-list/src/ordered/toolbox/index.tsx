import { Element } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 16 6">
        <path
          d="M1.54839 6V1.5H0V0H3.09677V6H1.54839ZM5.16129 6V3.5C5.16129 3.21667 5.26039 2.979 5.45858 2.787C5.65609 2.59567 5.90107 2.5 6.19355 2.5H8.25806V1.5H5.16129V0H8.77419C9.06667 0 9.312 0.0956664 9.51019 0.287C9.7077 0.479 9.80645 0.716667 9.80645 1V2.5C9.80645 2.78333 9.7077 3.02067 9.51019 3.212C9.312 3.404 9.06667 3.5 8.77419 3.5H6.70968V4.5H9.80645V6H5.16129ZM11.3548 6V4.5H14.4516V3.5H12.3871V2.5H14.4516V1.5H11.3548V0H14.9677C15.2602 0 15.5052 0.0956664 15.7027 0.287C15.9009 0.479 16 0.716667 16 1V5C16 5.28333 15.9009 5.52067 15.7027 5.712C15.5052 5.904 15.2602 6 14.9677 6H11.3548Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  Thumb: () => {
    return <div className={styles.thumb}>TODO</div>;
  },
  title: 'ナンバーリスト',
  description: 'ナンバーリストを作成します。',
};

export default toolbox;
