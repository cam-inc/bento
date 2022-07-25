import { ComponentType, PDJSX, VNode, Props } from '../types';
import {
  hasOwnProperty,
  isEditorJSVNode,
  isWhiteSpace,
  parseObjectToCssText,
} from '../helpers';
import { reconcileElements } from './elements';
import { reconcileChildren } from './childlen';

type ReconcileParams = {
  parentDom: PDJSX.Element;
  oldDom: Substitutional.Element | null;
  newVNode: VNode;
  oldVNode: VNode | null;
  commitQueue: ComponentType[];
};

export const reconcile = ({
  parentDom,
  oldDom,
  newVNode,
  oldVNode,
  commitQueue,
}: ReconcileParams) => {
  const newType = newVNode.type;
  let newPluginProps: VNode['pluginProps'] = null;
  if (typeof newType === 'function') {
    const newProps = newVNode.props;

    if (oldVNode?.component) {
      newVNode.component = oldVNode.component;
    } else {
      // NOTE: We only support functional component.
      newVNode.component = newType(newProps);
    }

    reconcileChildren({});
  } else {
    newVNode.dom = reconcileElements({});
  }

  return {
    dom: newVNode.dom,
    pluginProps: newPluginProps as unknown as NonNullable<VNode['pluginProps']>,
  };
};

export const commitRoot = (queue: ComponentType[]) => {};

/*
 * @deprecated
 */
export const traverseNodes = (vNode: VNode, parent?: VNode): VNode | null => {
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
          dom: document.createTextNode(child) as unknown as PDJSX.Element,
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
