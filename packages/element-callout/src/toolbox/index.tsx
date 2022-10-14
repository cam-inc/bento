import { Element } from '@bento-editor/core';
import { styles } from './index.css';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 20 20">
        <path
          d="M9 9H11V3H9V9ZM10 13C10.2833 13 10.521 12.904 10.713 12.712C10.9043 12.5207 11 12.2833 11 12C11 11.7167 10.9043 11.479 10.713 11.287C10.521 11.0957 10.2833 11 10 11C9.71667 11 9.47933 11.0957 9.288 11.287C9.096 11.479 9 11.7167 9 12C9 12.2833 9.096 12.5207 9.288 12.712C9.47933 12.904 9.71667 13 10 13ZM0 20V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H18C18.55 0 19.021 0.195667 19.413 0.587C19.8043 0.979 20 1.45 20 2V14C20 14.55 19.8043 15.021 19.413 15.413C19.021 15.8043 18.55 16 18 16H4L0 20Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  Thumb: () => {
    return (
      <img
        className={styles.thumb}
        alt="Callout"
        src="data:image/png;base64,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"
      />
    );
  },
  title: 'Callout',
  description: '注意文を作成します',
};

export default toolbox;
