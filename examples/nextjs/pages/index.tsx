import {
  Editor,
  EditorProps,
  EditorRenderer,
  Renderers,
} from '@bento-editor/core';
import elementParagraph, {
  ParagraphRenderer,
} from '@bento-editor/element-paragraph';
import elementHeading, { HeadingRenderer } from '@bento-editor/element-heading';
import textFormat, { TextFormatRenderer } from '@bento-editor/text-format';
import {
  LiRenderer,
  list as elementList,
  listItem as elementListItem,
  UlRenderer,
} from '@bento-editor/element-list';
import elementEmoji from '@bento-editor/element-emoji';
import type { NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';

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
        type: 'heading',
        children: [
          {
            type: 'format',
            text: 'heading 1',
          },
        ],
      },
      {
        type: 'heading',
        children: [
          {
            type: 'format',
            text: 'heading 2',
          },
        ],
        attributes: {
          level: 2,
        },
      },
      {
        type: 'heading',
        children: [
          {
            type: 'format',
            text: 'heading 3',
          },
        ],
        attributes: {
          level: 3,
        },
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
    ],
    []
  );

  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback<EditorProps['onChange']>((value) => {
    console.log(value);
    setValue(value);
  }, []);

  const renderers = useMemo<Renderers>(
    () => ({
      paragraph: ParagraphRenderer,
      heading: HeadingRenderer,
      format: TextFormatRenderer,
      list: UlRenderer,
      'list-item': LiRenderer,
    }),
    []
  );

  return (
    <div>
      <Editor
        config={config}
        initialValue={initialValue}
        onChange={handleChange}
      />
      <EditorRenderer renderers={renderers} data={value} />
    </div>
  );
};

export default Home;
