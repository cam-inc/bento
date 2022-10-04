import React from 'react';
import { RendererProps } from '@bento-editor/core';
import { styles } from './index.css';
import defaultAttributes, { Attributes } from '../attributes';
import { Card } from '../components';

export const EmbedRenderer: React.FC<RendererProps<Attributes>> = ({
  attributes,
}) => {
  attributes = { ...defaultAttributes.defaultValue, ...attributes };
  const href = attributes.href;
  const title = attributes.title;

  if (href == null || href === '' || title == null || title === '') {
    return null;
  }

  return (
    <div className={styles.root}>
      <Card href={href} title={title} />
    </div>
  );
};
