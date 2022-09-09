import React from 'react';
import ReactDOM from 'react-dom';
import { helpers } from '@bento-editor/core';
import { isBrower } from '@bento-editor/core';

const {
  logger: { error },
  error: { GeneralError },
} = helpers;

export const TARGET = {
  MODAL: 'element-emoji-container-modal',
} as const;
export type Target = typeof TARGET[keyof typeof TARGET];

export type PortalProps = {
  target: Target;
  children: React.ReactNode;
};
export const Portal: React.FC<PortalProps> = ({ target, children }) => {
  // All portals are not supported when being SSRed.
  if (!isBrower) {
    return null;
  }

  const targetElm = document.querySelector(`#${target}`);
  if (!targetElm) {
    error({ messages: [new GeneralError(`Element #${target} not found.`)] });
    return null;
  }
  return ReactDOM.createPortal(children, targetElm);
};
