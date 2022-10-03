import { Element } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export { DividerRenderer } from './renderer';

const element: Element<Attributes> = {
  type: 'divider',
  attributes,
  editable,
  toolbox,
  isVoid: true,
};
export default element;
