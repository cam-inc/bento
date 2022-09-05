import { Element, ElementContainer } from '@bento-editor/core';
import React from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: 'default value', attributes: {} }],
  Component: (props) => {
    return (
      <ElementContainer {...props}>
        <p className={styles.root}>{props.children}</p>
      </ElementContainer>
    );
  },

};
export default editable;
