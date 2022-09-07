import { Element, ElementContainer } from '@bento-editor/core';
import React from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [],
  Component: (props) => {
    return (
      <ElementContainer {...props}>
        <span className={styles.root}>{props.children}</span>
      </ElementContainer>
    );
  },
};

export default editable;
