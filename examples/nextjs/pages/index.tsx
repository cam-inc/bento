import {
  Editor,
  EditorProps,
  EditorRenderer,
  Renderers,
} from '@bento-editor/core';
import elementParagraph, {
  ParagraphRenderer,
} from '@bento-editor/element-paragraph';
import {
  level01 as elementHeadingLevel01,
  level02 as elementHeadingLevel02,
  level03 as elementHeadingLevel03,
  Level01Renderer as HeadingLevel01Renderer,
  Level02Renderer as HeadingLevel02Renderer,
  Level03Renderer as HeadingLevel03Renderer,
} from '@bento-editor/element-heading';
import elementNote, { NoteRenderer } from '@bento-editor/element-note';
import elementCallout, { CalloutRenderer } from '@bento-editor/element-callout';
import elementDivider, { DividerRenderer } from '@bento-editor/element-divider';
import elementQuote, { QuoteRenderer } from '@bento-editor/element-quote';
import {
  container as elementToggleContainer,
  head as elementToggleHead,
  body as elementToggleBody,
  ContainerRenderer as ToggleContainerRenderer,
  HeadRenderer as ToggleHeadRenderer,
  BodyRenderer as ToggleBodyRenderer,
} from '@bento-editor/element-toggle';
import {
  list as elementList,
  listItem as elementListItem,
  orderedList as elementOrderedList,
  todoList as elementTodoList,
  todoListItem as elementTodoListItem,
  ListItemRenderer,
  ListRenderer,
  OrderedListRenderer,
  TodoListRenderer,
  TodoListItemRenderer,
} from '@bento-editor/element-list';
import elementLink, { LinkRenderer } from '@bento-editor/element-link';
import elementEmbed, { EmbedRenderer } from '@bento-editor/element-embed';
import textFormat, { TextFormatRenderer } from '@bento-editor/text-format';
import textEmoji, { EmojiRenderer } from '@bento-editor/text-emoji';
import type { NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';

const Home: NextPage = () => {
  const config = useMemo<NonNullable<EditorProps['config']>>(
    () => ({
      elements: [
        elementParagraph,
        elementHeadingLevel01,
        elementHeadingLevel02,
        elementHeadingLevel03,
        elementList,
        elementListItem,
        elementOrderedList,
        elementTodoList,
        elementTodoListItem,
        elementNote,
        elementCallout,
        elementLink,
        elementEmbed,
        elementDivider,
        elementQuote,
        elementToggleContainer,
        elementToggleHead,
        elementToggleBody,
      ],
      texts: [textFormat, textEmoji],
      themeToken: {
        /**
         * uncomment this to set values for the editor.
        editor: {
          padding: '160px'
        },
        */
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
  const initialValue = useMemo<NonNullable<EditorProps['initialValue']>>(
    () => [
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
            type: 'format',
            text: 'default value',
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
        children: [{ text: '', }],
      },
      {
        type: 'quote',
        attributes: {
          cite: 'google'
        },
        children: [
          {
            type: 'format',
            text: 'default value',
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
          }
        ]
      },
      {
        type: 'embed',
        attributes: {},
        children: [
          {
            type: 'format',
            text: '',
          }
        ]
      },
    ],
    []
  );

  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback<NonNullable<EditorProps['onChange']>>((value) => {
    console.log(value);
    setValue(value);
  }, []);

  const renderers = useMemo<Renderers>(
    () => ({
      paragraph: ParagraphRenderer,
      heading01: HeadingLevel01Renderer,
      heading02: HeadingLevel02Renderer,
      heading03: HeadingLevel03Renderer,
      list: ListRenderer,
      'ordered-list': OrderedListRenderer,
      'list-item': ListItemRenderer,
      'todo-list': TodoListRenderer,
      'todo-list-item': TodoListItemRenderer,
      note: NoteRenderer,
      callout: CalloutRenderer,
      divider: DividerRenderer,
      quote: QuoteRenderer,
      toggle: ToggleContainerRenderer,
      'toggle-head': ToggleHeadRenderer,
      'toggle-body': ToggleBodyRenderer,
      link: LinkRenderer,
      embed: EmbedRenderer,
      format: TextFormatRenderer,
      emoji: EmojiRenderer,
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
      <EditorRenderer renderers={renderers} data={value} config={config} />
    </div>
  );
};

export default Home;
