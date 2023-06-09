import { Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'todo-list-item',
  attributes,
  editable,
  insertBreak: (editor, nodeEntry) =>
    helpers.insertBreaks.copyInsertBreak(editor, nodeEntry),
};
export default element;
