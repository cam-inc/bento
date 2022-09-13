import { Text } from '@bento-editor/core';
import classnames from 'classnames';
import React from 'react';
import attributes, { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Text<Attributes>['editable'] = {
  Component: (props) => {
    const {
      bold, italic, strikethrough, underline
    } = {
      ...attributes.defaultValue,
      ...props.text.attributes,
    };

    return (
      <span {...props.attributes} className={classnames({
        [styles.bold]: bold,
        [styles.italic]: italic,
        [styles.strikethrough]: strikethrough,
        [styles.underline]: underline,
      })}>{props.children}</span>
    );
  },

};
export default editable;
