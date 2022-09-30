import React from 'react';
import { Element } from '@bento-editor/core';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 18 18">
        <path
          d="M6.6 12.6L8 11.175L5.825 9L8 6.825L6.6 5.4L3 9L6.6 12.6ZM11.4 12.6L15 9L11.4 5.4L10 6.825L12.175 9L10 11.175L11.4 12.6ZM2 18C1.45 18 0.979 17.8043 0.587 17.413C0.195667 17.021 0 16.55 0 16V2C0 1.45 0.195667 0.979 0.587 0.587C0.979 0.195667 1.45 0 2 0H16C16.55 0 17.021 0.195667 17.413 0.587C17.8043 0.979 18 1.45 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.021 17.8043 16.55 18 16 18H2Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  Thumb: () => {
    return <div>TODO</div>;
  },
  title: 'Embed',
  description: 'TODO',
};

export default toolbox;
