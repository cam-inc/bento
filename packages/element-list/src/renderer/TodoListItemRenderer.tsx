import React, { useCallback } from 'react';
import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../todo-item/attributes';

export const TodoListItemRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  const checked = !!attributes?.checked;

  // To surpress error of the input[type="checkbox"].
  const noop = useCallback(() => {}, []);

  return (
    <li>
      <input
        type="checkbox"
        checked={checked}
        disabled={checked}
        onChange={noop}
      />
      {children}
    </li>
  );
};
