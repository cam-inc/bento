import type { EditorConfig, ToolConstructable } from '@editorjs/editorjs';
import EditorJS from '@editorjs/editorjs';
import { createElement, Fragment } from './create-element';
import {
  Component as ComponentType,
  EditorJSConfigs,
  EditorJSTools,
  PDJSX,
  VNode,
} from './types';
import {
  commitRoot,
  reconcile,
  getPluginProps,
  setPluginProps,
} from './reconciler';
import { v4 as uuidV4 } from 'uuid';
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
    const dom = reconcile({
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

  return PluginDeclarative as unknown as ToolConstructable;
};

export const render = (
  plugins: Array<{
    pluginName: string;
    element: VNode | Substitutional.Element | JSX.Element;
  }>,
  Container: typeof EditorJS,
  configs: EditorJSConfigs = {}
) => {
  const editorjsTools: EditorJSTools = {};

  plugins.forEach(({ pluginName, element }) => {
    // NOTE: An array for collecting side effects.
    let commitQueue: ComponentType[] = [];

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
      const id = uuidV4();
      const vNode = element as VNode;

      const initialVNode = createElement(Fragment, null, vNode);
      const parentDom = { children: initialVNode } as unknown as PDJSX.Element;

      initialVNode.pluginName = pluginName + id;

      // NOTE: It is need to create DOM in this render function.
      // So, we call the reconcle function in this.
      // This is referred in https://editorjs.io/tools-api#render that
      // the render function should call document.createElement and return the result of it.
      const dom = reconcile({
        parentDom,
        newVNode: initialVNode,
        oldVNode: null,
        commitQueue,
        oldDom: null,
      });

      if (dom) {
        const wrapper = document.createElement('x-pd');
        wrapper.id = pluginName + id;
        wrapper.appendChild(dom);
        return wrapper;
      } else {
        throw new Error('The new dom is empty.');
      }
    };

    commitRoot(commitQueue);

    editorjsTools[pluginName] = PluginDeclarative;
  });

  return new Container({
    tools: editorjsTools,
    ...configs,
  });
};
