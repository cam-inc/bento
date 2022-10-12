import { Element } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'toggle-head',
  attributes,
  editable,
};
export default element;
