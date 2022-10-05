import React, { useMemo } from 'react';
import classnames from 'classnames';
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

  const isLink = useMemo(() => {
    return (
      attributes?.href !== undefined &&
      attributes.href !== '' &&
      attributes.target !== undefined
    );
  }, [attributes.href, attributes.target]);

  return isLink ? (
    <a
      href={attributes.href}
      target={attributes.target}
      className={styles.href}
    >
      <span className={classnames(...classNames)}>{children}</span>
    </a>
  ) : (
    <span className={classnames(...classNames)}>{children}</span>
  );
};
