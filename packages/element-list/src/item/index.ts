import { Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'list-item',
  attributes,
  editable,
  insertBreak: (editor, nodeEntry, config) =>
    helpers.insertBreaks.copyAndRemoveEmptyTextInsertBreak(
      editor,
      nodeEntry,
      config
    ),
};
export default element;
