import { Editor } from 'slate';
import { Config } from '../config';

// @see: https://docs.slatejs.org/concepts/08-plugins
export type EditorPlugin = (editor: Editor, config: Config) => Editor;
