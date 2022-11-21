import classnames from 'classnames';
import {
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
} from 'react';
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
  onClick: MouseEventHandler;
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ radius = BUTTON_RADIUS.NONE, onClick, children, disabled }, ref) => {
    const handleClick = useCallback(
      (e: MouseEvent) => {
        onClick(e);
      },
      [onClick]
    );

    return (
      <button
        ref={ref}
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
  }
);
