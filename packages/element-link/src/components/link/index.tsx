import { OpenInNewIcon } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

type LinkProps = {
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
};

export const Link: React.FC<LinkProps> = ({ href, target }) => {
  return (
    <a href={href} target={target} className={styles.root}>
      <span className={styles.href}>{href}</span>
      {target === '_blank' && (
        <span className={styles.openInNewIcon}>
          <OpenInNewIcon />
        </span>
      )}
    </a>
  );
};
