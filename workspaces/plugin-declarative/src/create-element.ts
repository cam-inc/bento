import { Key, Ref, VNodeProps, VNode, Props } from "./types";

const createVNode = ({ type, props, key, ref, original }: VNodeProps) => {
  const vNode: VNode = {
    type,
    props,
    key,
    ref,
    children: null,
    parent: null,
    depth: 0,
    dom: null,
    nextDom: null,
    component: null,
    hydrating: null,
    // @ts-expect-error
    constructor: undefined,
    original, // NOTE: absolutely null? : https://github.com/preactjs/preact/blob/master/src/create-element.js#L40
    pluginProps: null,
    isRoot: false,
  };

  return vNode;
};

export const createElement = (
  type: VNode["type"],
  config: { [key: string]: any } | null,
  /*
   * NOTE: We replaced original implementations using `arguments`
   * with using rest parameters(`...`).
   */
  ...children: VNode[]
) => {
  const props: { [key: string]: any } = {};

  let key: Key | undefined = undefined;
  let ref: Ref | undefined = undefined;
  for (let i in config) {
    if (i === "key") {
      key = config[i];
    } else if (i === "ref") {
      ref = config[i];
    } else {
      props[i] = config[i];
    }
  }

  if (children != null) {
    props.children = children;
  }

  return createVNode({
    type,
    props: props as unknown as Props,
    key,
    ref,
    original: null,
  });
};

export const Fragment = (props: VNode["props"]) => props.children;
