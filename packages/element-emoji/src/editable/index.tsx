import { Element, ElementContainer, isText } from '@bento-editor/core';
import React from 'react';
import defaultAttributes, { Attributes } from '../attributes';
import { EmojiPickerContainer } from '../components/emoji-picker/container';
import { styles } from './index.css';

const PATTERN_OPEN_PICKER = /:/;

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'emoji',
      attributes: {},
      children: [
        {
          type: 'format',
          text: '',
        },
      ],
    },
  ],
  Component: (props) => {
    const pickerStatus =
      props.element.attributes?.['picker-status'] ??
      defaultAttributes.defaultValue['picker-status'];

    let isOpened = pickerStatus === 'open';

    let searchString = '';
    const child = props.element.children[0];
    if (isText(child)) {
      isOpened = !!child.text.match(PATTERN_OPEN_PICKER);
      const [_, value] = child.text.split(':');
      searchString = value;
    }

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
