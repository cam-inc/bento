'use client';
import { Editor, EditorProps, EditorRenderer } from '@bento-editor/core';
import { useCallback, useState } from 'react';
import { config, renderers } from '@/lib/bento/config';
export function Bento() {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback<NonNullable<EditorProps['onChange']>>(
    (value) => {
      console.log(value);
      setValue(value.elements);
    },
    []
  );

  return (
    <div className="playground">
      <section>
        <h1>EDITOR 👇</h1>
        <div className="editor">
          <Editor
            config={config}
            initialValue={initialValue}
            onChange={handleChange}
          />
        </div>
      </section>
      <section>
        <h1>RESULT 👇</h1>
        <div className="result">
          <EditorRenderer renderers={renderers} data={value} config={config} />
        </div>
      </section>
    </div>
  );
}

const initialValue: EditorProps['initialValue'] = [
  {
    type: 'heading01',
    children: [
      {
        type: 'format',
        text: 'heading 1',
      },
    ],
  },
  {
    type: 'heading02',
    children: [
      {
        type: 'format',
        text: 'heading 2',
      },
    ],
  },
  {
    type: 'heading03',
    children: [
      {
        type: 'format',
        text: 'heading 3',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'format',
        text: 'paragraph 01',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'format',
        text: 'paragraph 02',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'format',
        text: 'paragraph with emoji',
      },
      {
        type: 'emoji',
        text: '😃',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'format',
        text: 'italic',
        attributes: {
          italic: true,
        },
      },
      {
        type: 'format',
        text: 'bold',
        attributes: {
          bold: true,
        },
      },
      {
        type: 'format',
        text: 'underline',
        attributes: {
          underline: true,
        },
      },
      {
        type: 'format',
        text: 'strikethrough',
        attributes: {
          strikethrough: true,
        },
      },
      {
        type: 'format',
        text: 'all',
        attributes: {
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
        },
      },
    ],
  },
  {
    type: 'list',
    attributes: {
      listStyleType: 'disc',
    },
    children: [
      {
        type: 'list-item',
        children: [
          {
            type: 'format',
            text: 'AAA',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            type: 'format',
            text: 'BBB',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            type: 'format',
            text: 'CCC',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            type: 'format',
            text: 'DDD',
          },
        ],
      },
    ],
  },
  {
    type: 'ordered-list',
    children: [
      {
        type: 'list-item',
        children: [
          {
            type: 'format',
            text: 'AAA',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            type: 'format',
            text: 'BBB',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            type: 'format',
            text: 'CCC',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            type: 'format',
            text: 'DDD',
          },
        ],
      },
    ],
  },
  {
    type: 'todo-list',
    children: [
      {
        type: 'todo-list-item',
        children: [
          {
            type: 'format',
            text: 'AAA',
          },
        ],
      },
      {
        type: 'todo-list-item',
        children: [
          {
            type: 'format',
            text: 'BBB',
          },
        ],
      },
      {
        type: 'todo-list-item',
        children: [
          {
            type: 'format',
            text: 'CCC',
          },
        ],
      },
      {
        type: 'todo-list-item',
        children: [
          {
            type: 'format',
            text: 'DDD',
          },
        ],
      },
    ],
  },
  {
    type: 'note',
    children: [
      {
        type: 'note-body',
        children: [
          {
            type: 'format',
            text: '',
          },
        ],
      },
    ],
  },
  {
    type: 'callout',
    children: [
      {
        type: 'format',
        text: 'default value',
      },
    ],
  },
  {
    type: 'divider',
    children: [{ text: '' }],
  },
  {
    type: 'quote',
    attributes: {},
    children: [
      {
        type: 'format',
        text: 'quotequote',
      },
    ],
  },
  {
    type: 'toggle',
    attributes: {
      isOpen: true,
    },
    children: [
      {
        type: 'toggle-head',
        children: [
          {
            type: 'format',
            text: 'toggle head',
          },
        ],
      },
      {
        type: 'toggle-body',
        children: [
          {
            type: 'format',
            text: 'toggle body',
          },
        ],
      },
    ],
  },
  {
    type: 'link',
    attributes: {},
    children: [
      {
        type: 'format',
        text: '',
      },
    ],
  },
];
