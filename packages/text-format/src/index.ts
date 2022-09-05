import { Text } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbar from './toolbar';
export { TextFormatRenderer } from './renderer';

const text: Text<Attributes> = {
  type: 'format',
  attributes,
  editable,
  toolbar,
};
export default text;
