import React from 'react';
import { RendererProps } from '@bento-editor/core';

export const LiRenderer: React.FC<RendererProps> = ({ children }) => {
  return <li>{children}</li>;
};
