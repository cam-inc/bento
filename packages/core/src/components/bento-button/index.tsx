import React from 'react';
import cn from 'classnames';
import { styles } from './index.css';

type BentoButtonProps = {
  onClick: React.MouseEventHandler;
  children: React.ReactNode | string;
  disabled?: boolean;
  className?: string;
};

export const BentoButton: React.FC<BentoButtonProps> = ({
  onClick,
  children,
  disabled,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(styles.root, className)}
    >
      {children}
    </button>
  );
};
