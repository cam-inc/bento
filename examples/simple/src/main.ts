import ToolBlockParagraph from '@bento-editor/tool-block-paragraph';
import type { Data as ToolBlockParagraphData } from '@bento-editor/tool-block-paragraph';
import Editor, { LogLevels } from '@editorjs/editorjs';
import './style.css';

const canvasElm = document.querySelector<HTMLDivElement>('#canvas');

if (!canvasElm) {
  throw new Error('Could not find the element#canvas.');
}

new Editor({
  holder: canvasElm,
  tools: {
    myparagraph: {
      class: ToolBlockParagraph,
    }
  },
  // @see: https://editorjs.io/configuration#change-the-default-block
  //defaultBlock: 'myparagraph',
  autofocus: true,
  placeholder: 'Let`s write an awesome story!',
  //logLevel: LogLevels.VERBOSE,
});
