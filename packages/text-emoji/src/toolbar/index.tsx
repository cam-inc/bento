import { Text } from '@bento-editor/core';
import React from 'react';

const toolbar: Text['toolbar'] = {
  Icon: () => {
    return <div>😃</div>;
  },
};

export default toolbar;
