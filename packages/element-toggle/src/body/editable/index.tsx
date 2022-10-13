import { Element, ElementContainer } from '@bento-editor/core';
import React, { useContext } from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';
import { ContainerContext } from '../../container/editable';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'format',
      attributes: {},
      text: 'default body',
    },
  ],
  Component: (props) => {
    const parentElement = useContext(ContainerContext);
    if (!parentElement.attributes?.isOpen) {
      return null;
    }
    return (
      <ElementContainer {...props}>
        <div className={styles.root}>{props.children}</div>
      </ElementContainer>
    );
  },
};
export default editable;
