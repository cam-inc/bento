import { Element, ElementContainer } from '@bento-editor/core';
import React from 'react';

export const ParagraphElement: Element = (props) => {
  return (
    <ElementContainer {...props}>
      <p {...props.attributes}>{props.children}</p>
    </ElementContainer>
  );
};
