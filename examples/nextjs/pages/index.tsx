import { Config, Editor, EditorProps } from '@bento-editor/core';
import { ParagraphElement } from '@bento-editor/element-paragraph';
import { HeadingElement } from '@bento-editor/element-heading';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const initialValue: EditorProps['initialValue'] = [
  {
    children: [
      {
        text: 'xxx'
      }
    ]
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'xxx'
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
  ]
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Editor initialValue={initialValue} config={config} />
    </div>
  )
}

export default Home
