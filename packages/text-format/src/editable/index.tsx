import { Text } from '@bento-editor/core';
import classnames from 'classnames';
import React, { useMemo, useCallback, useState } from 'react';
import attributes, { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Text<Attributes>['editable'] = {
  Component: (props) => {
    const { bold, italic, strikethrough, underline, href, target } = {
      ...attributes.defaultValue,
      ...props.text.attributes,
    };
    const [contentEditable, setContentEditable] = useState(true);

    const isLink = useMemo(() => {
      return href !== undefined && href !== '' && target !== undefined;
    }, [href, target]);

    const handleLinkMouseEnter = useCallback(() => {
      setContentEditable(false);
    }, []);
    const handleLinkMouseLeave = useCallback(() => {
      setContentEditable(true);
    }, []);

    return isLink ? (
      <a
        href={href}
        target={target}
        className={styles.href}
        onMouseEnter={handleLinkMouseEnter}
        onMouseLeave={handleLinkMouseLeave}
        contentEditable={contentEditable}
      >
        <span
          {...props.attributes}
          className={classnames({
            [styles.bold]: bold,
            [styles.italic]: italic,
            [styles.strikethrough]: strikethrough,
            [styles.underline]: underline,
          })}
        >
          {props.children}
        </span>
      </a>
    ) : (
      <span
        {...props.attributes}
        className={classnames({
          [styles.bold]: bold,
          [styles.italic]: italic,
          [styles.strikethrough]: strikethrough,
          [styles.underline]: underline,
        })}
      >
        {props.children}
      </span>
    );
  },
};
export default editable;
