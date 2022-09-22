import React from 'react';
import { Element } from '@bento-editor/core';

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
    return <div>TODO</div>;
  },
  title: 'Callout',
  description: 'TODO',
};

export default toolbox;
