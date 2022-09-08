import React from 'react';
import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';

export const ParagraphRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
}) => {
  return <p>{children}</p>;
};
