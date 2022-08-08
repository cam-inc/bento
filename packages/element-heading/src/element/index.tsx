import { Element } from '@bento-editor/core';
import React from 'react';

export const HeadingElement: Element = (props) => {
  return (
    <h1 {...props.attributes}>{props.children}</h1>
  );
};
