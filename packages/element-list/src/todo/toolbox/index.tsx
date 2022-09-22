import { Element } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 20 15">
        <path
          d="M3.55 15L0 11.4677L1.4 10.0746L3.525 12.1891L7.775 7.9602L9.175 9.37811L3.55 15ZM3.55 7.0398L0 3.50746L1.4 2.11443L3.525 4.22886L7.775 0L9.175 1.41791L3.55 7.0398ZM11 13.0099V11.0199H20V13.0099H11ZM11 5.04975V3.0597H20V5.04975H11Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  Thumb: () => {
    return <div className={styles.thumb}>TODO</div>;
  },
  title: 'TODOリスト',
  description: 'TODOリストを作成します。',
};

export default toolbox;
