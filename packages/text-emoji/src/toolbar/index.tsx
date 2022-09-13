import { Text } from '@bento-editor/core';
import React from 'react';
import { Attributes } from '../attributes';

const toolbar: Text<Attributes>['toolbar'] = {
  Component: () => {
    return <div>😃</div>;
  },
};

export default toolbar;
