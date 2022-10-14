import { ExclamationIcon, RendererProps } from '@bento-editor/core';
import { styles } from './index.css';

export const NoteRenderer: React.FC<RendererProps> = ({ children }) => {
  return (
    <p className={styles.root}>
      <span className={styles.exclamationIcon}>
        <ExclamationIcon type="note" />
      </span>
      {children}
    </p>
  );
};
