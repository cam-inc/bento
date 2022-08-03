import { css } from '@emotion/css';
import React from 'react';
import { BaseElement, } from 'slate';
import { ContainerItemElement } from './item';

export type ContainerElement = BaseElement & {
  type: 'container';
  children: ContainerItemElement[];
};

export type ContainerProps = {
  element: ContainerElement;
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className={css({
      display: 'flex'
    })}>{children}</div>
  );
};
