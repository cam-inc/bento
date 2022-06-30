import { EditorJSX } from "./types";

export type EditorJSXVNodeType = keyof EditorJSX.EditorJSToolElements;

export const emptyVNode: {
  [K in EditorJSXVNodeType]: null;
} = {
  tool: null,
  inlineTool: null,
  blockTune: null,
} as const;

export const pluginMethodPrefixes = {
  STATIC_GETTER: "static_get_",
  STATIC_METHOD: "static_",
} as const;
