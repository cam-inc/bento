import { Element } from '@bento-editor/core';
import editable from './editable';
import toolbox from './toolbox';
export { HeadingRenderer } from './renderer';

const element: Element = {
  type: 'heading',
  editable,
  toolbox,
};
export default element;
