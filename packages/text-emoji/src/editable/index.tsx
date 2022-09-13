import { Text } from '@bento-editor/core';
import React, { useState, useEffect } from 'react';
import { Attributes } from '../attributes';
import { EmojiPickerContainer } from '../components/emoji-picker/container';
import { styles } from './index.css';

// const PATTERN_OPEN_PICKER = /:/;

const editable: Text<Attributes>['editable'] = {
  Component: (props) => {
    console.log(props);

    const [isOpened, setIsOpened] = useState(false);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
      setIsOpened(true);
      setSearchString('');
    }, []);

    return (
      <EmojiPickerContainer isOpened={isOpened} searchString={searchString}>
        <span className={styles.root}>{props.children}</span>
      </EmojiPickerContainer>
    );
  },
};

export default editable;
