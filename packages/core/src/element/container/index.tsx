import React from 'react';
import { RenderElementProps } from 'slate-react';
import { styles } from './index.css';

export type ElementContainerProps = RenderElementProps
export const ElementContainer: React.FC<ElementContainerProps> = (props) => {
  return (
    <div {...props.attributes} className={styles.root}>
      <div>container</div>
      <div>{props.children}</div>
    </div>
  );
};
