import React from 'react';
import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';

export const Level03Renderer: React.FC<RendererProps<Attributes>> = ({
  children,
}) => {
  return <h3>{children}</h3>
};
