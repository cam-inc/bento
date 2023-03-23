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
import textFormat, { TextFormatRenderer } from '@bento-editor/text-format';
import textEmoji, { EmojiRenderer } from '@bento-editor/text-emoji';
import type { NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';

const Home: NextPage = () => {
  const config = useMemo<NonNullable<EditorProps['config']>>(
    () => ({
      rootPlaceholder: 'Type something',
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
        type: 'paragraph',
        children: [
          {
            type: 'format',
            text: '',
          },
        ],
      },
    ],
    []
  );

  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback<NonNullable<EditorProps['onChange']>>(
    (value) => {
      // console.log(value);
      setValue(value.elements);
    },
    []
  );

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
