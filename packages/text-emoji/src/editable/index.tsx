import { Text } from '@bento-editor/core';
import React from 'react';
import { Attributes } from '../attributes';
import { EmojiPickerContainer } from '../components/emoji-picker/container';
import { styles } from './index.css';

const PATTERN_OPEN_PICKER = /:/;

const editable: Text<Attributes>['editable'] = {
  Component: (props) => {
    console.log(props);
    let isOpened = false;

    let searchString = '';
    const child = props.text.text;
    isOpened = !!child.match(PATTERN_OPEN_PICKER);
    const [_, value] = child.split(':');
    searchString = value;

    return (
      <EmojiPickerContainer isOpened={isOpened} searchString={searchString}>
        <span className={styles.root}>{props.children}</span>
      </EmojiPickerContainer>
    );
  },
};

export default editable;
