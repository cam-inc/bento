import { Element, ElementContainer, isText } from '@bento-editor/core';
import React from 'react';
import defaultAttributes, { Attributes } from '../attributes';
import { EmojiPicker } from '../components/emoji-picker';
import { styles } from './index.css';

const PREFIX_OPEN_PICKER = ':';

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
    const child = props.element.children[0];
    if (isText(child)) {
      isOpened = child.text.startsWith(PREFIX_OPEN_PICKER);
    }

    return (
      <>
        <ElementContainer {...props}>
          <span className={styles.root}>{props.children}</span>
        </ElementContainer>
        {isOpened && <EmojiPicker onEmojiSelect={console.log} />}
      </>
    );
  },
};

export default editable;
