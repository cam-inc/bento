import { Element } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export { HeadingRenderer } from './renderer';

const element: Element<Attributes> = {
  type: 'heading',
  attributes,
  editable,
  toolbox,
};
export default element;
