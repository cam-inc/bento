import { ElementContainer, Text } from '@bento-editor/core';
import React, { useState, useEffect } from 'react';
import { Attributes } from '../attributes';
import { EmojiPickerContainer } from '../components/emoji-picker/container';
import { styles } from './index.css';

// const PATTERN_OPEN_PICKER = /:/;

const editable: Text<Attributes>['editable'] = {
  defaultValue: [{ type: 'emoji', text: '' }],
  Component: (props) => {
    const [isOpened, setIsOpened] = useState(false);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
      setIsOpened(true);
      setSearchString('');
    }, []);

    return (
      <ElementContainer {...props}>
        <EmojiPickerContainer isOpened={isOpened} searchString={searchString}>
          <span className={styles.root}>{props.children}</span>
        </EmojiPickerContainer>
      </ElementContainer>
    );
  },
};

export default editable;
