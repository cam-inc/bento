import { helpers, Popover, Text, usePopover } from '@bento-editor/core';
import React, { useEffect, useCallback } from 'react';
import { Attributes } from '../attributes';
import { EmojiPickerContainer } from '../components/emoji-picker/container';
import { styles } from './index.css';

const editable: Text<Attributes>['editable'] = {
  defaultValue: [{ type: 'emoji', text: '' }],
  Component: (props) => {
    const popover = usePopover<HTMLSpanElement>();

    useEffect(() => {
      popover.open();
    }, []);

    const createInsertText = useCallback(() => {
      return (emojiNative: string) => {
        helpers.Editor.insertText(props.editor, emojiNative);
      };
    }, []);

    const insertText = createInsertText();

    return (
      <>
        <span className={styles.root} ref={popover.targetRef} />
        <Popover {...popover.bind}>
          <EmojiPickerContainer
            insertText={insertText}
            onRequestClose={popover.close}
          />
        </Popover>
      </>
    );
  },
};

export default editable;
