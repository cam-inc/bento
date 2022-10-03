import { Element } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export { QuoteRenderer } from './renderer';

const element: Element<Attributes> = {
  type: 'quote',
  attributes,
  editable,
  toolbox,
};
export default element;
