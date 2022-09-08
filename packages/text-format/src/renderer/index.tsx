import React from 'react';
import cn from 'classnames';
import { RendererProps } from '@bento-editor/core';
import defaultAttributes, { Attributes } from '../attributes';
import { styles } from './index.css';

export const TextFormatRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  attributes = { ...defaultAttributes.defaultValue, ...attributes };
  const classNames: string[] = [];
  for (const prop in attributes) {
    const value = attributes[prop as keyof Attributes];
    if (value) {
      classNames.push(styles[prop as keyof typeof styles]);
    }
  }
  return <span className={cn(...classNames)}>{children}</span>;
};
