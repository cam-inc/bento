import { Element, ElementContainer } from '@bento-editor/core';
import React from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'toggle-head',
      attributes: {},
      children: [
        {
          type: 'format',
          text: 'default head',
        },
      ],
    },
    {
      type: 'toggle-body',
      attributes: {},
      children: [
        {
          type: 'format',
          text: 'default body',
        },
      ],
    },
  ],
  Component: (props) => {
    const isOpen = !!props.element.attributes?.isOpen;
    return (
      <ElementContainer {...props}>
        <div contentEditable={false}>
          <div>isOpen: {isOpen.toString()}</div>
        </div>
        <div className={styles.root}>{props.children}</div>
      </ElementContainer>
    );
  },
};
export default editable;
