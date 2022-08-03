import { css } from '@emotion/css';
import React from 'react';
import { BaseElement } from 'slate';

export type ContainerItemElement = BaseElement & {
  type: 'container-item';
  grow?: number;
  shrink?: number;
};

export type ContainerItemProps = {
  element: ContainerItemElement;
  children: React.ReactNode;
};

export const ContainerItem: React.FC<ContainerItemProps> = ({ element, children }) => {
  const { grow = 1, shrink = 1 } = element;
  return (
    <div className={css({
      flex: `${grow} ${shrink} 0`
    })}>{children}</div>
  );
};
