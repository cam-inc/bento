import { Element } from '@bento-editor/core';
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
    return (
      <img
        className={styles.thumb}
        alt="TODOリスト"
        src="data:image/png;base64,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"
      />
    );
  },
  title: 'TODOリスト',
  description: 'タスクを管理します',
};

export default toolbox;
