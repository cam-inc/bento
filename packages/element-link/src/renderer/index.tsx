import { RendererProps } from '@bento-editor/core';
import { styles } from './index.css';
import defaultAttributes, { Attributes } from '../attributes';
import { Link } from '../components';

export const LinkRenderer: React.FC<RendererProps<Attributes>> = ({
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
      <Link href={href} target={target} />
    </div>
  );
};
