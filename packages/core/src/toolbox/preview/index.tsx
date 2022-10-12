import React from 'react';
import { Config } from '../../config';
import { styles } from './index.css';

export type ToolboxPreviewProps = {
  node: Config['elements'][number] | Config['texts'][number];
};
export const ToolboxPreview: React.FC<ToolboxPreviewProps> = ({ node }) => {
  return (
    <div className={styles.root}>
      {node.toolbox && (
        <>
          {node.toolbox.Thumb && (
            <div className={styles.thumb}>
              <node.toolbox.Thumb />
            </div>
          )}
          <div className={styles.title}>{node.toolbox.title}</div>
          {node.toolbox.description && (
            <div className={styles.description}>
              {node.toolbox.description}
            </div>
          )}
        </>
      )}
    </div>
  );
};
