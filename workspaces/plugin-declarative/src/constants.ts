import { PDJSX } from "./types";

export type PDJSXVNodeType = keyof PDJSX.EditorJSToolElements;

export const emptyVNode: {
  [K in PDJSXVNodeType]: null;
} = {
  tool: null,
  inlineTool: null,
  blockTune: null,
} as const;

export const pluginMethodPrefixes = {
  STATIC_GETTER: "static_get_",
  STATIC_METHOD: "static_",
} as const;
