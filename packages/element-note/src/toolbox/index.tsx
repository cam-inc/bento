import React from 'react';
import { Element } from '@bento-editor/core';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 20 20">
        <path
          d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H18C18.55 0 19.021 0.195667 19.413 0.587C19.8043 0.979 20 1.45 20 2V14C20 14.55 19.8043 15.021 19.413 15.413C19.021 15.8043 18.55 16 18 16H4L0 20Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  Thumb: () => {
    return <div>TODO</div>;
  },
  title: '注釈',
  description: 'TODO',
};

export default toolbox;
