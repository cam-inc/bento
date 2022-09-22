import React from 'react';
import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';

export const OrderedListRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  return <ol style={{ ...attributes }}>{children}</ol>;
};
