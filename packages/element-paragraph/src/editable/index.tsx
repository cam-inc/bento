import { Element, ElementContainer } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

const editable: Element['editable'] = {
  defaultValue: [{ text: 'default value' }],
  Component: (props) => {
    return (
      <ElementContainer {...props}>
        <p className={styles.root}>{props.children}</p>
      </ElementContainer>
    );
  },

};
export default editable;
