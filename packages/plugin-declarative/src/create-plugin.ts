import type { ToolConstructable } from '@editorjs/editorjs';
import { createElement, Fragment } from './create-element';
import { Component as ComponentType, PDJSX, VNode } from './types';
import {
  commitRoot,
  reconcile,
  getPluginProps,
  setPluginProps,
} from './reconciler';
import { options } from './options';

// NOTE: Removed `replaceNode` from params because of using this directory as API
export const createPlugin = (
  vNode: VNode | Substitutional.Element
): ToolConstructable => {
  // NOTE: An array for collecting side effects.
  let commitQueue: ComponentType[] = [];

  const initialVNode = createElement(Fragment, null, vNode as VNode);
  const parentDom = { children: initialVNode } as unknown as PDJSX.Element;
  // TODO: fix get plugin props
  // const PluginDeclarative = setPluginProps(getPluginProps(initialVNode));
  class PluginDeclarative {
    static get toolbox() {
      return {
        icon: 'aaa',
        title: 'hoge',
      };
    }
    render() {}
  }

  // TODO: JSX as props
  // transformPluginProps(nodes?.pluginProps);

  PluginDeclarative.prototype.render = function () {
    // NOTE: It is need to create DOM in this render function.
    // So, we call the reconcle function in this.
    // This is referred in https://editorjs.io/tools-api#render that
    // the render function should call document.createElement and return the result of it.
    options.dom = reconcile({
      parentDom,
      newVNode: initialVNode,
      oldVNode: null,
      commitQueue,
      oldDom: null,
    });

    if (options.dom) {
      return options.dom;
    } else {
      throw new Error('The new dom is empty.');
    }
  };

  // TODO: commit queue
  commitRoot(commitQueue);

  return PluginDeclarative as unknown as ToolConstructable;
};
