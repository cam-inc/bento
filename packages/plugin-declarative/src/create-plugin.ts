import type { ToolConstructable } from '@editorjs/editorjs';
import { createElement, Fragment } from './create-element';
import { ComponentType, PDJSX, VNode } from './types';
import { commitRoot, reconcile } from './reconciler';
import { mapPluginProps } from './reconciler/props';

// NOTE: Removed `replaceNode` from params because of using this directory as API
export const createPlugin = (
  vNode: VNode | Substitutional.Element
): ToolConstructable => {
  let commitQueue: ComponentType[] = [];
  const parentDom = {} as unknown as PDJSX.Element;

  const initialVNode = createElement(Fragment, null, vNode as VNode);

  const PluginDeclarative = mapPluginProps(initialVNode);

  // TODO: JSX as props
  // transformPluginProps(nodes?.pluginProps);

  parentDom._children = initialVNode;

  PluginDeclarative.prototype.render = function () {
    // NOTE: It is need to create DOM in this render function.
    // So, we call the reconcle function in this.
    // This is referred in https://editorjs.io/tools-api#render that
    // the render function should call document.createElement and return the result of it.
    const { dom } = reconcile({
      parentDom,
      newVNode: initialVNode,
      oldVNode: null,
      commitQueue,
      oldDom: null,
    });

    if (dom) {
      return dom;
    } else {
      throw new Error('The new dom is empty.');
    }
  };

  // TODO: commit queue
  commitRoot(commitQueue);

  return PluginDeclarative as ToolConstructable;
};
