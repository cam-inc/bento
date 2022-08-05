import { Editor, EditorProps } from '@bento-editor/core';
import React from 'react';
import ReactDOM from 'react-dom/client';

const canvas = document.querySelector('#canvas');
if (!canvas) {
  throw new Error('element#canvas not found.');
}

const initialValue: EditorProps['initialValue'] = [
  {
    children: [
      {
        text: 'xxx'
      }
    ]
  }
];

const root = ReactDOM.createRoot(canvas);
root.render(
  <React.StrictMode>
    <Editor initialValue={initialValue} />
  </React.StrictMode>
);
