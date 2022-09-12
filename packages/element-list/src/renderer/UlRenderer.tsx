import React from 'react';
import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../list/attributes';

export const UlRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  return <ul style={{ ...attributes }}>{children}</ul>;
};
