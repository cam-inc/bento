import { Element } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'toggle-body',
  attributes,
  editable,
  insertBreak: (editor) => {
    editor.splitNodes({ always: true });
    return true;
  },
};
export default element;
