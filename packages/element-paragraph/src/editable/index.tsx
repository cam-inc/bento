import { Element, ElementContainer } from '@bento-editor/core';
import React from 'react';

const editable: Element['editable'] = {
  defaultValue: [{ text: 'default value' }],
  Component: (props) => {
    return (
      <ElementContainer {...props}>
        <p {...props.attributes}>{props.children}</p>
      </ElementContainer>
    );
  },

};
export default editable;
