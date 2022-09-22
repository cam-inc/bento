import React from 'react';
import { CheckboxIcon, RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';
import {styles} from "./index.css"

export const TodoListItemRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  const checked = !!attributes?.checked;

  return (
    <li>
      <div className={styles.root}>
        <span
          className={styles.checkbox}
          contentEditable={false}
        >
          <CheckboxIcon checked={checked} disabled={true} />
        </span>
        {children}
      </div>
    </li>
  );
};
