import { Editor, EditorProps } from '@bento-editor/core';
import elementParagraph from '@bento-editor/element-paragraph';
import elementHeading from '@bento-editor/element-heading';
import elementEmoji from '@bento-editor/element-emoji';
import {
  list as elementList,
  listItem as elementListItem,
} from '@bento-editor/element-list';
import textFormat from '@bento-editor/text-format';
import type { NextPage } from 'next';
import { useCallback, useMemo } from 'react';

const Home: NextPage = () => {
  const config = useMemo<EditorProps['config']>(
    () => ({
      elements: [
        elementParagraph,
        elementHeading,
        elementList,
        elementListItem,
        elementEmoji,
      ],
      texts: [textFormat],
      themeToken: {
        color: {
          /**
          * uncomment this to set colors forcibly no matter it's dark mode or not.
        background: 'darkblue',
        backgroundOn: 'lightblue',
        */
          /**
          * uncomment this to set colors separately for light and dark modes.
        light: {
          background: 'lightgreen',
          backgroundOn: 'darkgreen',
        },
        dark: {
          background: 'darkgreen',
          backgroundOn: 'lightgreen',
        },
        */
        },
      },
    }),
    []
  );

  const initialValue = useMemo<EditorProps['initialValue']>(
    () => [
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
        type: 'heading',
        children: [
          {
            type: 'format',
            text: 'heading',
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
              {
                type: 'format',
                text: 'DDD',
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const handleChange = useCallback<EditorProps['onChange']>((value) => {
    console.log(value);
  }, []);

  return (
    <div>
      <Editor
        config={config}
        initialValue={initialValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Home;
