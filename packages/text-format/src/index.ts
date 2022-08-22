import { Text } from '@bento-editor/core';
import editable from './editable';
import toolbar from './toolbar';

const text: Text = {
  type: 'format',
  editable,
  toolbar,
};
export default text;
