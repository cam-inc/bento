import React from 'react';
import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';

export const Level01Renderer: React.FC<RendererProps<Attributes>> = ({
  children,
}) => {
  return <h1>{children}</h1>
};
