import React from 'react';
import { CheckboxIcon, RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';

export const TodoListItemRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  const checked = !!attributes?.checked;

  return (
    <li>
      <div style={{ display: 'flex' }}>
        <span
          style={{ display: 'block', width: 18, height: 18 }}
          contentEditable={false}
        >
          <CheckboxIcon checked={checked} disabled={true} />
        </span>
        {children}
      </div>
    </li>
  );
};
