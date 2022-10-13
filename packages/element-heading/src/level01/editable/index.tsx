import { Element, ElementContainer } from '@bento-editor/core';
import React from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: 'default value' }],
  Component: (props) => {
    return (
      <ElementContainer {...props} utilsPositionY={5}>
        <h1 className={styles.root}>{props.children}</h1>
      </ElementContainer>
    );
  },
};
export default editable;