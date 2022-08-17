import { Editor, EditorProps } from '@bento-editor/core';
import elementParagraph from '@bento-editor/element-paragraph';
import elementHeading from '@bento-editor/element-heading';
import textFormat from '@bento-editor/text-format';
import type { NextPage } from 'next';
import { useCallback, useMemo } from 'react';

const Home: NextPage = () => {
  const config = useMemo<EditorProps['config']>(() => ({
    elements: [
      elementParagraph,
      elementHeading,
    ],
    texts: [
      textFormat,
    ]
  }), []);

  const initialValue = useMemo<EditorProps['initialValue']>(() => ([
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
  ]), []);

  const handleChange = useCallback<EditorProps['onChange']>((value) => {
    console.log(value);
  }, []);

  return (
    <div>
      <Editor config={config} initialValue={initialValue} onChange={handleChange} />
    </div>
  )
}

export default Home;
