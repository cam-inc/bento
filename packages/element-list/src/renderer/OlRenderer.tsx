import React from 'react';
import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../list/attributes';

export const OlRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  return <ol style={{ ...attributes }}>{children}</ol>;
};
