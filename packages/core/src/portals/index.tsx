import ReactDOM from 'react-dom';
import { GeneralError } from '../helpers/error';
import { error } from '../helpers/logger';
import { isBrower } from '../utils';

export * from './modal';
export * from './popover';

export const TARGET = {
  MODAL: 'bento-portal-container-modal',
  POPOVER: 'bento-portal-container-popover',
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
