import { Element, ElementContainer } from '@bento-editor/core';
import React from 'react';

const editable: Element['editable'] = {
  defaultValue: [{ text: 'default value' }],
  Component: (props) => {
    return (
      <ElementContainer {...props}>
        <h1 {...props.attributes}>{props.children}</h1>
      </ElementContainer>
    );
  },

};
export default editable;
