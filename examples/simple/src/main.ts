import ToolBlockParagraph from '@bento-editor/tool-block-paragraph';
import type { Data as ToolBlockParagraphData } from '@bento-editor/tool-block-paragraph';
import Editor, { LogLevels } from '@editorjs/editorjs';
import './style.css';

const canvasElm = document.querySelector<HTMLDivElement>('#canvas');
const saveElm = document.querySelector<HTMLButtonElement>('#save');

if (!canvasElm) {
  throw new Error('Could not find the element#canvas.');
}

const editor = new Editor({
  holder: canvasElm,
  tools: {
    myparagraph: {
      // TODO: fix type error
      class: ToolBlockParagraph,
      inlineToolbar: true,
    }
  },
  data: {
    // TODO: より厳密に型を。
    blocks: [
      {
        type: 'myparagraph',
        data: {
          value: 'initial paragraph 01'
        }
      },
      {
        type: 'myparagraph',
        data: {
          value: 'initial paragraph 02'
        }
      }
    ]
  },
  onReady: () => {
    console.log('Editor.js is ready to work!');
  },
  onChange: (api, event) => {
    console.log('Now I know that Editor\'s content changed!', event);
  },
  // @see: https://editorjs.io/configuration#change-the-default-block
  //defaultBlock: 'myparagraph',
  autofocus: true,
  placeholder: 'Let`s write an awesome story!',
  //logLevel: LogLevels.VERBOSE,
});

saveElm?.addEventListener('click', () => {
  editor.save().then(outputData => {
    console.log('saved: ', outputData);
  }).catch(error => {
    console.log('save failed: ', error);
  })
});
