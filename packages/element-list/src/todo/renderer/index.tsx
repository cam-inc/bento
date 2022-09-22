import React from 'react';
import { RendererProps } from '@bento-editor/core';
import {styles} from "./index.css"

export const TodoListRenderer: React.FC<RendererProps> = ({ children }) => {
  return (
    <ul className={styles.root}>
      {children}
    </ul>
  );
};
