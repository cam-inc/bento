import React from 'react';
import { RendererProps } from '@bento-editor/core';
import defaultAttributes, { Attributes } from '../attributes';

const getFontWeight = (
  attributes: Attributes
): NonNullable<React.CSSProperties['fontWeight']> => {
  if (attributes.bold) {
    return 'bold';
  } else {
    return 'inherit';
  }
};

const getFontStyle = (
  attributes: Attributes
): NonNullable<React.CSSProperties['fontStyle']> => {
  if (attributes.italic) {
    return 'italic';
  } else {
    return 'inherit';
  }
};

export const TextFormatRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  attributes = { ...defaultAttributes.defaultValue, ...attributes };
  return (
    <span
      style={{
        fontWeight: getFontWeight(attributes),
        fontStyle: getFontStyle(attributes),
      }}
    >
      {children}
    </span>
  );
};
