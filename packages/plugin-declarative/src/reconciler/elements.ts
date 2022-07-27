import { ComponentType, PDJSX, VNode } from 'react';
import { reconcileProps } from './props';

export type ReconcileElementsParams = {
  dom: PDJSX.Element | null;
  newVNode: VNode;
  oldVNode: VNode | null;
  commitQueue: ComponentType[];
};

export const reconcileElements = ({
  dom,
  newVNode,
  oldVNode,
  commitQueue,
}: ReconcileElementsParams) => {
  const newProps = newVNode.props;
  const oldProps = oldVNode?.props ?? {};

  if (dom === null) {
    // NOTE: Not element but text node value
    if (newVNode.type === null) {
      return document.createTextNode(`${newProps}`);
    }

    dom = document.createElement(newVNode.type as string);
  }

  if (newVNode.type === null) {
    const textNodeProps = newProps as unknown as PDJSX.Element['_data'];
    if (newProps !== oldProps && dom._data !== textNodeProps) {
      dom._data = textNodeProps;
    }
  } else {
    // NOTE: Apply side effects of props to dom.
    reconcileProps({
      dom,
      newProps,
      oldProps,
    });
    // TODO: diff children
  }
  return dom;
};
