import { Text } from '@bento-editor/core';
import React from 'react';
import { Attributes } from '../attributes';

const editable: Text<Attributes>['editable'] = {
  Component: (props) => {
    return (
      <span {...props.attributes}>{props.children}</span>
    );
  },

};
export default editable;
