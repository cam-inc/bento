import { Text } from '@bento-editor/core';
import editable from './editable';
import toolbar from './toolbar';
export { TextFormatRenderer } from './renderer';

const text: Text = {
  type: 'format',
  editable,
  toolbar,
};
export default text;
