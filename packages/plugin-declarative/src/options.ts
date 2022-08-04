import { Component, EditorJSConfigs, EditorJSTools, VNode } from './types';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';

export type Options = {
  diff: (vNode: VNode) => void;
  diffed: (vNode: VNode) => void;
  render: (vNode: VNode) => void;
  unmount: (vNode: VNode) => void;

  commit: (vNode: VNode, commitQueue: Component[]) => void;
  hook: (component: Component, index: number, type: number) => void;
  requestAnimationFrame: typeof requestAnimationFrame;
  debounceRendering?: (cb: () => void) => void;

  pluginName: string | null;
};

export const options = {} as Options;
