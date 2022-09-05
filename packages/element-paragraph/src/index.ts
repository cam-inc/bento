import { Element } from '@bento-editor/core';
import editable from './editable';
import toolbox from './toolbox';
export { ParagraphRenderer } from './renderer';

const element: Element = {
  type: 'paragraph',
  editable,
  toolbox,
};
export default element;
