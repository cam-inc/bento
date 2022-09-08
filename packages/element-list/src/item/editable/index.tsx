import { Element, ElementContainer } from '@bento-editor/core';
import React from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'format',
      attributes: {},
      text: '',
    },
  ],
  Component: (props) => {
    return (
      <ElementContainer {...props}>
        <div className={styles.root}>{props.children}</div>
      </ElementContainer>
    );
  },
};
export default editable;
