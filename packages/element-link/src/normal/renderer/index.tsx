import React from 'react';
import { RendererProps, OpenInNewIcon } from '@bento-editor/core';
import { styles } from './index.css';
import defaultAttributes, { Attributes } from '../attributes';

export const NormalLinkRenderer: React.FC<RendererProps<Attributes>> = ({
  attributes,
}) => {
  attributes = { ...defaultAttributes.defaultValue, ...attributes };
  const href = attributes.href;
  const target = attributes.target;

  if (href == null || href === '') {
    return null;
  }

  return (
    <div className={styles.root}>
      <a href={href} target={target}>
        <div className={styles.container}>
          {href}
          {target === '_blank' && (
            <span className={styles.openInNewIcon}>
              <OpenInNewIcon />
            </span>
          )}
        </div>
      </a>
    </div>
  );
};
