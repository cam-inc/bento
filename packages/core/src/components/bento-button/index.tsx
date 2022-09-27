import React from 'react';
import cn from 'classnames';
import { styles } from './index.css';

type BentoButtonProps = {
  onClick: React.MouseEventHandler;
  children: React.ReactNode | string;
  disabled?: boolean;
};

export const BentoButton: React.FC<BentoButtonProps> = ({
  onClick,
  children,
  disabled,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.root}>
      {children}
    </button>
  );
};
