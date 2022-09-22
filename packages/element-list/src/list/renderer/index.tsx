import React from 'react';
import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';

export const ListRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  return <ul style={{ ...attributes }}>{children}</ul>;
};
