import React from 'react';
import { RendererProps } from '@bento-editor/core';
import defaultAttributes, { Attributes } from '../attributes';

const render = (
  attributes: Attributes,
  children: RendererProps['children']
) => {
  const { level } = attributes;

  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    default:
      return <h1>{children}</h1>;
  }
};

export const HeadingRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  attributes = { ...defaultAttributes.defaultValue, ...attributes };
  return render(attributes, children);
};
