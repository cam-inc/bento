import type { ToolConstructable } from '@editorjs/editorjs';
import { createElement, Fragment } from './create-element';
import { PDJSX, Props, VNode } from './types';
import { pluginMethodPrefixes } from './constants';
import {
  hasOwnProperty,
  isWhiteSpace,
  isEditorJSVNode,
  parseObjectToCssText,
} from './helpers';
// import type { UnionToIntersection } from "type-fest";
// import { isObjectFactory } from "./helpers";

const traverseNodes = (vNode: VNode, parent?: VNode): VNode | null => {
  if (hasOwnProperty(vNode, 'parent') && parent) {
    vNode.parent = parent;
  }
  if (typeof vNode.type === 'function') {
    const childlen = vNode.type(vNode.props);
    if (Array.isArray(childlen)) {
      for (const v of childlen) {
        return traverseNodes(v, vNode);
      }
    } else if (childlen != null) {
      return traverseNodes(childlen, vNode);
    } else {
      return null;
    }
  } else if (typeof vNode.type === 'string' && isEditorJSVNode(vNode.type)) {
    const { children, ...pluginProps } = vNode.props;

    for (const child of children) {
      traverseNodes(child, vNode);
    }

    vNode.isRoot = true;
    vNode.children = children.filter((child: VNode) =>
      hasOwnProperty(child, 'type')
    );
    vNode.pluginProps = pluginProps as PDJSX.PluginAttributes;
    vNode.parent = null;

    return vNode;
  } else if (typeof vNode.type === 'string') {
    // for HTMLElement
    const element = document.createElement(vNode.type);
    const { children, ...otherProps } = vNode.props;

    // check children type
    for (const child of children) {
      if (typeof child === 'string' && !isWhiteSpace(child)) {
        const textVNode: VNode = {
          type: 'text',
          key: undefined,
          ref: undefined,
          props: {} as unknown as Props,
          dom: document.createTextNode(child),
          original: null,
          children: null,
          component: null,
          constructor: Object.prototype.constructor,
          depth: 0,
          isRoot: false,
          hydrating: null,
          nextDom: null,
          pluginProps: null,
          parent: vNode,
        };
        if (vNode.children === null) {
          vNode.children = [textVNode];
        } else {
          vNode.children = [...vNode.children, textVNode];
        }
      } else {
        vNode.children = children.filter((child: VNode) =>
          hasOwnProperty(child, 'type')
        );
        traverseNodes(child, vNode);
      }
    }

    // attach event handler
    for (const [k, v] of Object.entries(otherProps)) {
      if (k === 'className') {
        element.className = v;
      } else if (k === 'style') {
        element.style.cssText = parseObjectToCssText(v);
      } else if (k === 'onClick') {
        element.addEventListener('click', v);
      } else {
        // @ts-expect-error
        element[k.toLowerCase()] = v;
      }
    }

    vNode.dom = element;
    // append dom
    return vNode;
  }
  return vNode;
};

const createNodes = (vNode: VNode): VNode => {
  if (vNode.parent) {
    vNode.parent.dom?.appendChild(vNode.dom);
  }

  if (vNode.children) {
    for (const child of vNode.children) {
      vNode.dom?.appendChild(child.dom);
      createNodes(child);
    }
  }

  return vNode;
};

const mapPluginProps = (
  pluginProps: NonNullable<VNode['pluginProps']>,
  Plugin: ToolConstructable
) => {
  const { STATIC_GETTER, STATIC_METHOD } = pluginMethodPrefixes;

  for (const [k, v] of Object.entries(pluginProps)) {
    if (k.startsWith(STATIC_GETTER)) {
      const key = k.replace(STATIC_GETTER, '');
      Plugin[key as keyof typeof Plugin] = v;
    } else if (k.startsWith(STATIC_METHOD)) {
      const key = k.replace(STATIC_METHOD, '');
      Plugin[key as keyof typeof Plugin] = v;
    } else {
      Plugin.prototype[k] = v;
    }
  }

  return Plugin;
};

const createDomTree = (vNode: VNode) => {
  // NOTE: create DOM node
  let domTree: HTMLElement | null = null;
  if (
    isEditorJSVNode(vNode.type as string) &&
    vNode.isRoot &&
    vNode.children?.length === 1
  ) {
    for (const child of vNode.children) {
      domTree = createNodes(child).dom as HTMLElement;
    }
    return domTree;
  }
  // else if (nodes.isRoot && nodes.children?.length === 1) {
  //   console.log("nodes", nodes.dom);
  //   return nodes.dom as HTMLElement;
  // }
  else {
    throw new Error();
  }
};

// const transformPluginProps = (
//   pluginProps: NonNullable<VNode["pluginProps"]>
// ): NonNullable<VNode["pluginProps"]> => {
//   for (const [k, v] of Object.entries(pluginProps)) {
//     // NOTE: Check poperty object
//     const { isObject, isEmptyObject } = isObjectFactory(v);
//     if (isObject && !isEmptyObject) {
//       if (hasOwnProperty(v, "type")) {
//         const nodes = traverseNodes(v);
//         if (nodes !== null) {
//           // NOTE: This nodes doesn't have Editor.js native JSX Element, so add `isRoot: true` manually
//           nodes.isRoot = true;
//           const domTree = createDomTree(nodes);
//           // @ts-expect-error
//           pluginProps[k] = domTree;
//         }
//       } else {
//         return transformPluginProps(v);
//       }
//     }
//   }
//   return pluginProps;
// };

/**
 * @description Remove `replaceNode` from params because of using this directory as API
 */
export const createPlugin = (vNode: VNode): ToolConstructable => {
  const initialVNode = createElement(Fragment, null, vNode);

  const initialNodes = traverseNodes(initialVNode);

  // TODO: diff & commit

  class Plugin {}

  if (initialNodes?.pluginProps != null) {
    // TODO: JSX as props
    // transformPluginProps(nodes?.pluginProps);

    // @ts-expect-error
    Plugin.prototype.render = function () {
      // NOTE: need to recreate DOM in this render function: https://editorjs.io/tools-api#render
      // TODO: replace that with more good ways...
      const newNodes = traverseNodes(initialVNode);
      if (newNodes) {
        const domTree = createDomTree(newNodes);
        if (domTree) {
          return domTree;
        }
      }
    };
    return mapPluginProps(
      initialNodes.pluginProps,
      Plugin as unknown as ToolConstructable
    );
  }

  return Plugin as unknown as ToolConstructable;
};
