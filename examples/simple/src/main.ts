import Editor from '@editorjs/editorjs';
import './style.css';

const canvasElm = document.querySelector<HTMLDivElement>('#canvas');

if (!canvasElm) {
  throw new Error('Could not find the element#canvas.');
}

new Editor({
  holder: canvasElm,
});
