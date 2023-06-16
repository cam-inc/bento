import { Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'callout',
  attributes,
  editable,
  toolbox,
  insertBreak: (editor, nodeEntry, config) =>
    helpers.insertBreaks.copyAndTextEmptyRemoveInsertBreak(
      editor,
      nodeEntry,
      config
    ),
};

export default element;
