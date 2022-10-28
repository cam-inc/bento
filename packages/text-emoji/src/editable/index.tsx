import { helpers, Popover, Text, usePopover } from '@bento-editor/core';
import { useEffect, useCallback } from 'react';
import { Attributes } from '../attributes';
import { EmojiPickerContainer } from '../components/emoji-picker/container';
import { styles } from './index.css';

const editable: Text<Attributes>['editable'] = {
  defaultValue: [{ type: 'emoji', text: '' }],
  Component: (props) => {
    const popover = usePopover<HTMLSpanElement>();

    console.log('test: ', props.text.text);
    useEffect(() => {
      if (!props.text.text) {
        popover.open();
      }
    }, [props.text.text]);

    const createInsertText = useCallback(() => {
      return (emojiNative: string) => {
        helpers.Editor.insertText(props.editor, emojiNative);
      };
    }, []);

    const insertText = createInsertText();

    return (
      <>
        <span className={styles.root} ref={popover.targetRef}>
          {props.text.text}
        </span>
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
