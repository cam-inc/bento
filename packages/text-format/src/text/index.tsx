import { Text } from '@bento-editor/core';
import React from 'react';

export const FormatText: Text = (props) => {
  return (
    <span {...props.attributes}>{props.children}</span>
  );
};
