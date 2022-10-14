import { ExclamationIcon, RendererProps } from '@bento-editor/core';
import { styles } from './index.css';

export const CalloutRenderer: React.FC<RendererProps> = ({ children }) => {
  return (
    <p className={styles.root}>
      <span className={styles.exclamationIcon}>
        <ExclamationIcon type="callout" />
      </span>
      {children}
    </p>
  );
};
