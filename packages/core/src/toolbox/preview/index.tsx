import React from 'react';
import { Config } from '../../config';
import { styles } from './index.css';

export type ToolboxPreviewProps = {
  element: Config['elements'][number] | Config['texts'][number];
};
export const ToolboxPreview: React.FC<ToolboxPreviewProps> = ({ element }) => {
  return (
    <div className={styles.root}>
      {element.toolbox && (
        <>
          <div className={styles.thumb}>
            <element.toolbox.Thumb />
          </div>
          <div className={styles.title}>{element.toolbox.title}</div>
          <div className={styles.description}>
            {element.toolbox.description}
          </div>
        </>
      )}
    </div>
  );
};
