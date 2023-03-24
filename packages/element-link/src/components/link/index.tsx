import { OpenInNewIcon } from '@bento-editor/core';
import { styles } from './index.css';

type LinkProps = {
  text?: string;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
};

export const Link: React.FC<LinkProps> = ({ text, href, target }) => {
  return (
    <a href={href} target={target} className={styles.root}>
      <span className={styles.href}>{text || href}</span>
      {target === '_blank' && (
        <span className={styles.openInNewIcon}>
          <OpenInNewIcon />
        </span>
      )}
    </a>
  );
};
