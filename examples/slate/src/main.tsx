import React from 'react';
import ReactDOM from 'react-dom/client';
import { Editor as BentoEditor, EditorProps as BentoEditorProps } from './core';

const canvas = document.querySelector('#canvas');
if (!canvas) {
  throw new Error('element#canvas not found.');
}

const initialValue: BentoEditorProps['initialValue'] = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'A line of text in a paragraph.'
      },
      {
        type: 'emoji',
        code: 'sad',
        text: ''
      },
      {
        type: 'format',
        bold: true,
        italic: true,
        text: 'A line of text in a paragraph.'
      }
    ],
  },
  {
    type: 'container',
    children: [
      {
        type: 'container-item',
        grow: 1,
        children: [{ text: 'itemA' }],
      },
      {
        type: 'container-item',
        grow: 2,
        children: [{ text: 'itemB' }],
      },
      {
        type: 'container-item',
        grow: 3,
        children: [{ text: 'itemC' }],
      }
    ],
  },
  {
    type: 'heading',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const root = ReactDOM.createRoot(canvas);
root.render(
  <React.StrictMode>
    <BentoEditor initialValue={initialValue} />
  </React.StrictMode>
);
