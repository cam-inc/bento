import classnames from 'classnames';
import React, { useCallback } from 'react';
import { styles } from './index.css';

export const BUTTON_RADIUS = {
  NONE: 'none',
  SMALL: 'small',
  MEDIUM: 'medium',
} as const;
export type ButtonRadius = typeof BUTTON_RADIUS[keyof typeof BUTTON_RADIUS];

export type ButtonProps = {
  radius?: ButtonRadius;
  onClick: () => void;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ radius = BUTTON_RADIUS.NONE, onClick, children }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button className={classnames({
      [styles.root]: true,
      [styles.rootRadiusSmall]: radius === BUTTON_RADIUS.SMALL,
      [styles.rootRadiusMedium]: radius === BUTTON_RADIUS.MEDIUM,
    })} onClick={handleClick}>
      <div className={styles.bg} />
      <div className={styles.container}>{children}</div>
    </button>
  );
}
