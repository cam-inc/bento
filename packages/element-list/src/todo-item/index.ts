import { Element } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';

const element: Element<Attributes> = {
  type: 'todo-list-item',
  attributes,
  editable,
  toolbox,
};
export default element;
