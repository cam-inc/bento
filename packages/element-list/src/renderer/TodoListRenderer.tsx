import React from 'react';
import { RendererProps } from '@bento-editor/core';

export const TodoListRenderer: React.FC<RendererProps> = ({ children }) => {
  return (
    <ul style={{ listStyleType: 'none', padding: 0, paddingLeft: '1rem' }}>
      {children}
    </ul>
  );
};
