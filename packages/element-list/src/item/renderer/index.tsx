import React from 'react';
import { RendererProps } from '@bento-editor/core';

export const ListItemRenderer: React.FC<RendererProps> = ({ children }) => {
  return <li>{children}</li>;
};
