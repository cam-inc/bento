import { Text } from '@bento-editor/core';
import React from 'react';

const editable: Text['editable'] = {
  Component: (props) => {
    return (
      <span {...props.attributes}>{props.children}</span>
    );
  },

};
export default editable;
