import { Element, ElementContainer, helpers } from '@bento-editor/core';
import { ChangeEvent, useCallback } from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: '引用を入力する' }],
  Component: (props) => {
    const cite = props.element.attributes?.cite;

    const handleCiteChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        props.editor.setNodes(
          {
            attributes: {
              cite: value,
            },
          },
          {
            at: helpers.ReactEditor.findPath(props.editor, props.element),
          }
        );
      },
      [props.editor, props.element]
    );

    return (
      <ElementContainer
        {...props}
        emptyState={<span className={styles.emptyState}>Empty quote</span>}
      >
        <div className={styles.root}>
          <div className={styles.blockquote}>{props.children}</div>
          <div className={styles.cite} contentEditable={false}>
            <input
              className={styles.input}
              value={cite}
              placeholder="引用元を追加"
              onChange={handleCiteChange}
            />
          </div>
        </div>
      </ElementContainer>
    );
  },
};
export default editable;
