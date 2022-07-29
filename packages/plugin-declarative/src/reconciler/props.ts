import { ToolConstructable } from '@editorjs/editorjs';
import {
  hasOwnProperty,
  isEditorJSVNode,
  isReadOnlyHtmlAttribute,
} from '../helpers';
import { pluginMethodPrefixes } from '../constants';
import { PDJSX, VNode } from '../types';
// import type { UnionToIntersection } from "type-fest";
// import { isObjectFactory } from "./helpers";

type ReconcilePropsParams = {
  dom: PDJSX.Element;
  newProps: VNode['props'];
  oldProps: VNode['props'] | { [key: string]: any };
};

type SetStylePropsParams = {
  dom: PDJSX.Element;
  key: string;
  value: string | number | null;
};

type SetPropsParams = {
  dom: PDJSX.Element;
  key: string;
  newValue: { [key: string]: any } | null;
  oldValue: string | { [key: string]: any };
};

export const setStyleProps = ({ dom, key, value }: SetStylePropsParams) => {
  if (key.startsWith('-') && typeof value !== 'number') {
    dom.style.setProperty(key, value);
  } else if (value == null) {
    // @ts-expect-error Set readonly style
    dom.style[key] = '';
  } else if (typeof value !== 'number') {
    // @ts-expect-error Set readonly style
    dom.style[key] = value;
  } else {
    // @ts-expect-error Set readonly style
    dom.style[key] = `${value}px`;
  }
};

export const setProps = ({ dom, key, newValue, oldValue }: SetPropsParams) => {
  if (key === 'style') {
    if (typeof newValue === 'string') {
      dom.style.cssText = newValue;
    } else {
      if (typeof oldValue === 'string') {
        // NOTE: Remove the old css text for setting style by key & value
        oldValue = '';
        dom.style.cssText = oldValue;
      }

      if (oldValue) {
        for (const oldKey in oldValue as {}) {
          if (!(newValue && hasOwnProperty(newValue, oldKey))) {
            setStyleProps({
              dom,
              key: oldKey,
              value: '',
            });
          }
        }
      }

      if (newValue) {
        for (const newKey in newValue) {
          if (
            !oldValue ||
            newValue[newKey] !== (oldValue as { [key: string]: any })[newKey]
          ) {
            setStyleProps({
              dom,
              key: newKey,
              value: newValue[newKey],
            });
          }
        }
      }
    }
  } else if (key.startsWith('on')) {
    const lowerKey = key.toLowerCase();
    // NOTE: `in` is better than `hasOwnProperty` when we want to check
    // the existence of the DOM premitive events.
    const eventName = lowerKey in dom ? lowerKey : key;
    const eventType = eventName.slice(2);
    const eventListener = function (e: Event) {
      if (newValue) (newValue as Function)(e);
    };
    if (newValue && !oldValue) {
      dom.addEventListener(eventType, eventListener);
    } else {
      dom.removeEventListener(eventType, eventListener);
    }
  } else if (isReadOnlyHtmlAttribute(key, dom)) {
    // @ts-expect-error Set readonly props
    dom[key] = newValue ?? '';
  } else if (
    typeof newValue === 'string' &&
    key !== 'dangerouslySetInnerHTML'
  ) {
    dom.setAttribute(key, newValue);
  }
};

export const reconcileProps = ({
  dom,
  newProps,
  oldProps,
}: ReconcilePropsParams) => {
  for (const [oldKey, oldValue] of Object.entries(oldProps)) {
    if (
      oldKey !== 'children' &&
      oldKey !== 'key' &&
      !hasOwnProperty(newProps, oldKey)
    ) {
      setProps({
        dom,
        key: oldKey,
        newValue: null,
        oldValue,
      });
    }
  }

  for (const [newKey, newValue] of Object.entries(newProps)) {
    if (
      newKey !== 'children' &&
      newKey !== 'key' &&
      newKey !== 'value' &&
      newKey !== 'checked' &&
      oldProps[newKey] !== newValue
    ) {
      setProps({
        dom,
        key: newKey,
        newValue,
        oldValue: oldProps[newKey],
      });
    }
  }
};

export const getPluginProps = (vNode: VNode): VNode['pluginProps'] | null => {
  if (typeof vNode.type === 'string' && isEditorJSVNode(vNode.type)) {
    const { children, ...pluginProps } = vNode.props;
    vNode.pluginProps = pluginProps as VNode['pluginProps'];
    // NOTE: PDJSXElement should be a root element.
    vNode.isRoot = true;
    return vNode.pluginProps;
  }

  if (typeof vNode.type === 'function') {
    const children = vNode.type(vNode.props);
    if (Array.isArray(children)) {
      for (const child of children) {
        return getPluginProps(child);
      }
    } else if (children) {
      return getPluginProps(children);
    } else {
      return null;
    }
  } else {
    return null;
  }

  return null;
};

export const setPluginProps = (pluginProps: VNode['pluginProps']) => {
  if (pluginProps) {
    const { STATIC_GETTER, STATIC_METHOD, CONSTRUCTOR } = pluginMethodPrefixes;

    class PluginDeclarative {
      constructor(params: any) {
        if (pluginProps?.initializer) {
          pluginProps.initializer(params);
        }
      }
    }

    for (const [k, v] of Object.entries(pluginProps)) {
      if (k.startsWith(STATIC_GETTER)) {
        const key = k.replace(STATIC_GETTER, '');
        PluginDeclarative[key as keyof typeof PluginDeclarative] = v;
      } else if (k.startsWith(STATIC_METHOD)) {
        const key = k.replace(STATIC_METHOD, '');
        PluginDeclarative[key as keyof typeof PluginDeclarative] = v;
      } else if (!k.startsWith(CONSTRUCTOR)) {
        // @ts-expect-error Class should have a property of the prototype.
        PluginDeclarative.prototype[k] = v;
      }
    }

    return PluginDeclarative as ToolConstructable;
  } else {
    return class {} as unknown as ToolConstructable;
  }
};

// TODO: JSX as props
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
