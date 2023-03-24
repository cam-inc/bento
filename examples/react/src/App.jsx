import '@bento-editor/core/styles';
import '@bento-editor/element-heading/styles';
import '@bento-editor/element-list/styles';
import '@bento-editor/element-paragraph/styles';
import '@bento-editor/element-note/styles';
import '@bento-editor/element-callout/styles';
import '@bento-editor/element-link/styles';
import '@bento-editor/element-divider/styles';
import '@bento-editor/element-quote/styles';
import '@bento-editor/element-toggle/styles';
import '@bento-editor/text-format/styles';
import '@bento-editor/text-emoji/styles';
import { Editor, EditorRenderer } from '@bento-editor/core';
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
import {
  container as elementNoteContainer,
  body as elementNoteBody,
  ContainerRenderer as NoteContainerRenderer,
  BodyRenderer as NoteBodyRenderer,
} from '@bento-editor/element-note';
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
  ListRenderer,
  ListItemRenderer,
  OrderedListRenderer,
  TodoListRenderer,
  TodoListItemRenderer,
} from '@bento-editor/element-list';
import elementLink, { LinkRenderer } from '@bento-editor/element-link';
import textFormat, { TextFormatRenderer } from '@bento-editor/text-format';
import textEmoji, { EmojiRenderer } from '@bento-editor/text-emoji';
import React, { useState } from 'react';

const config = {
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
    elementNoteContainer,
    elementNoteBody,
    elementCallout,
    elementLink,
    elementDivider,
    elementQuote,
    elementToggleContainer,
    elementToggleHead,
    elementToggleBody,
  ],
  texts: [textFormat],
};

const initialValue = [
  {
    type: 'heading01',
    children: [
      {
        type: 'format',
        text: 'heading01',
      },
    ],
  },
];

const renderers = {
  paragraph: ParagraphRenderer,
  heading01: HeadingLevel01Renderer,
  heading02: HeadingLevel02Renderer,
  heading03: HeadingLevel03Renderer,
  list: ListRenderer,
  'ordered-list': OrderedListRenderer,
  'list-item': ListItemRenderer,
  'todo-list': TodoListRenderer,
  'todo-list-item': TodoListItemRenderer,
  note: NoteContainerRenderer,
  'note-body': NoteBodyRenderer,
  callout: CalloutRenderer,
  divider: DividerRenderer,
  quote: QuoteRenderer,
  toggle: ToggleContainerRenderer,
  'toggle-head': ToggleHeadRenderer,
  'toggle-body': ToggleBodyRenderer,
  link: LinkRenderer,
  format: TextFormatRenderer,
  emoji: EmojiRenderer,
};

export default function App() {
  const [value, setValue] = useState(initialValue);
  const handleChange = (value) => {
    setValue(value.elements);
  };
  return (
    <div className="App">
      <h1>Hello</h1>
      <h2>Start editing to try out!</h2>
      <Editor
        config={config}
        initialValue={initialValue}
        onChange={handleChange}
      />
      <EditorRenderer renderers={renderers} data={value} config={config} />
    </div>
  );
}
