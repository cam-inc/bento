import { ToolConstructable } from '@editorjs/editorjs';
import { isEditorJSVNode } from '../helpers';
import { pluginMethodPrefixes } from '../constants';
import { VNode } from '../types';
// import type { UnionToIntersection } from "type-fest";
// import { isObjectFactory } from "./helpers";

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
