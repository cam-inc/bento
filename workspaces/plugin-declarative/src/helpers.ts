import { emptyVNode, PDJSXVNodeType } from "./constants";

export const isWhiteSpace = (str: string) => str === " ";
export const hasOwnProperty = <T = {}>(thisArg: T, key: keyof T) =>
  Object.prototype.hasOwnProperty.call(thisArg, key);

export const isEditorJSVNode = (
  type: PDJSXVNodeType | string
): type is PDJSXVNodeType => {
  return hasOwnProperty(emptyVNode, type as PDJSXVNodeType);
};

export const isObjectFactory = (o: any) => {
  const isObject =
    o != null && typeof o === "object" && typeof o !== "function";
  const isEmptyObject = isObject && Object.getOwnPropertyNames(o).length === 0;
  return {
    isObject,
    isEmptyObject,
  };
};

export const parseObjectToCssText = (o: { [key: string]: any }) => {
  let cssText = "";
  for (const [k, v] of Object.entries(o)) {
    cssText += `${k}: ${v};`;
  }
  return cssText;
};
