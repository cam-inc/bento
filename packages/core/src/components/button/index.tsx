import classnames from 'classnames';
import { useCallback } from 'react';
import { styles } from './index.css';

export const BUTTON_RADIUS = {
  NONE: 'none',
  SMALL: 'small',
  MEDIUM: 'medium',
  FULL: 'full',
} as const;
export type ButtonRadius = typeof BUTTON_RADIUS[keyof typeof BUTTON_RADIUS];

export type ButtonProps = {
  radius?: ButtonRadius;
  disabled?: boolean;
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  radius = BUTTON_RADIUS.NONE,
  onClick,
  children,
  disabled,
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClick(e);
    },
    [onClick]
  );

  return (
    <button
      type="button"
      className={classnames({
        [styles.root]: true,
        [styles.rootRadiusSmall]: radius === BUTTON_RADIUS.SMALL,
        [styles.rootRadiusMedium]: radius === BUTTON_RADIUS.MEDIUM,
        [styles.rootRadiusFull]: radius === BUTTON_RADIUS.FULL,
        [styles.disabled]: !!disabled,
      })}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className={styles.bg} />
      <div className={styles.container}>{children}</div>
    </button>
  );
};
