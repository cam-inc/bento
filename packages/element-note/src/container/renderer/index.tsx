import { ExclamationIcon, RendererProps } from '@bento-editor/core';
import { styles } from './index.css';

export const ContainerRenderer: React.FC<RendererProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.exclamationIcon}>
        <ExclamationIcon type="note" />
      </div>
      <div>{children}</div>
    </div>
  );
};
