import { Config, Editor, EditorProps } from '@bento-editor/core';
import { ParagraphElement } from '@bento-editor/element-paragraph';
import { HeadingElement } from '@bento-editor/element-heading';
import { FormatText } from '@bento-editor/text-format';
import type { NextPage } from 'next'

const initialValue: EditorProps['initialValue'] = [
  {
    type: 'paragraph',
    children: [
      {
        type: 'format',
        text: 'paragraph 01'
      }
    ]
  },
  {
    type: 'heading',
    children: [
      {
        type: 'format',
        text: 'heading'
      }
    ]
  },
  {
    type: 'paragraph',
    children: [
      {
        type: 'format',
        text: 'paragraph 02'
      }
    ]
  }
];

const config: Config = {
  elements: [
    {
      type: 'paragraph',
      Component: ParagraphElement,
    },
    {
      type: 'heading',
      Component: HeadingElement,
    }
  ],
  texts: [
    {
      type: 'format',
      Component: FormatText,
      Toolbar: () => {
        return (
          <div>clickme</div>
        );
      }
    }
  ]
};

const Home: NextPage = () => {
  return (
    <div>
      <Editor initialValue={initialValue} config={config} />
    </div>
  )
}

export default Home
