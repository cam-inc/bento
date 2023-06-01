import classnames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Portal, TARGET } from '../../portals';
import { useScreenGlobalStateValue } from '../../store';
import { styles } from './index.css';

// Which point of the target element the popover should be placed.
const PLACEMENT = {
  /**
   * ↑
   * . →
   * ┌   ┐
   * |   |
   * └   ┘
   */
  TOP_LEFT: 'TopLeft',
  /**
   *   ↑
   * ← . →
   * ┌   ┐
   * |   |
   * └   ┘
   */
  TOP: 'Top',
  /**
   *     ↑
   *   ← .
   * ┌   ┐
   * |   |
   * └   ┘
   */
  TOP_RIGHT: 'TopRight',
  /**
   * ┌   ┐ . →
   * |   | ↓
   * └   ┘
   */
  RIGHT_TOP: 'RightTop',
  /**
   * ┌   ┐ ↑
   * |   | . →
   * └   ┘ ↓
   */
  RIGHT: 'Right',
  /**
   * ┌   ┐
   * |   | ↑
   * └   ┘ . →
   */
  RIGHT_BOTTOM: 'RightBottom',
  /**
   * ┌   ┐
   * |   |
   * └   ┘
   *   ← .
   *     ↓
   */
  BOTTOM_RIGHT: 'BottomRight',
  /**
   * ┌   ┐
   * |   |
   * └   ┘
   * ← . →
   *   ↓
   */
  BOTTOM: 'Bottom',
  /**
   * ┌   ┐
   * |   |
   * └   ┘
   * . →
   * ↓
   */
  BOTTOM_LEFT: 'BottomLeft',
  /**
   *     ┌   ┐
   *   ↑ |   |
   * ← . └   ┘
   */
  LEFT_BOTTOM: 'LeftBottom',
  /**
   *   ↑ ┌   ┐
   * ← . |   |
   *   ↓ └   ┘
   */
  LEFT: 'Left',
  /**
   * ← . ┌   ┐
   *   ↓ |   |
   *     └   ┘
   */
  LEFT_TOP: 'LeftTop',
} as const;
type Placement = typeof PLACEMENT[keyof typeof PLACEMENT];

type PopoverProps = {
  isOpened: boolean;
  isHorizontal: boolean;
  onRequestClose: () => void;
  // Target element ref for a popover to be placed.
  targetRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  placement?: Placement;
  isScrollable?: boolean;
};

// TODO: desktop and mobile layout
export const Popover: React.FC<PopoverProps> = ({
  isOpened,
  isHorizontal,
  onRequestClose,
  targetRef,
  children,
  placement: fixedPlacement,
  isScrollable,
}) => {
  const screen = useScreenGlobalStateValue();
  const [scrollDistance, setScrollDistance] = useState<number>();
  const initialScrollYRef = useRef<number>();

  // Auto closing.
  useEffect(() => {
    const clickHandler = (e: Event) => {
      // Do nothing when the event has been dispatched from elements inside the target element.
      if (targetRef.current?.contains(e.target as Node)) {
        return;
      }
      if (initialScrollYRef.current) {
        initialScrollYRef.current = undefined;
        setScrollDistance(0);
      }
      onRequestClose();
    };
    const scrollHandler = () => {
      if (!isScrollable) {
        return onRequestClose();
      }
      if (initialScrollYRef.current === undefined) {
        initialScrollYRef.current = window.scrollY;
      } else {
        setScrollDistance(window.scrollY - initialScrollYRef.current);
      }
    };

    window.addEventListener('click', clickHandler);
    window.addEventListener('scroll', scrollHandler);
    const cleanup = () => {
      window.removeEventListener('click', clickHandler);
      window.removeEventListener('scroll', scrollHandler);
    };
    return cleanup;
  }, [targetRef, onRequestClose]);
  useEffect(() => {
    onRequestClose();
  }, [onRequestClose, screen]);

  // Stop event propagation.
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Placement
  const placement = useMemo<Placement>(() => {
    if (fixedPlacement) {
      return fixedPlacement;
    }
    const targetElement = targetRef.current;
    if (!targetElement) {
      return PLACEMENT.BOTTOM_LEFT;
    }
    const rect = targetElement.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    const isVerticallyOnUpside = centerY < screen.height / 3;
    const isVerticallyOnMiddle =
      screen.height / 3 <= centerY && centerY <= (screen.height / 3) * 2;
    const isVerticallyOnDownside = (screen.height / 3) * 2 < centerY;
    const isHorizontallyOnLeft = centerX < screen.width / 3;
    const isHorizontallyOnCenter =
      screen.width / 3 <= centerX && centerX <= (screen.width / 3) * 2;
    const isHorizontallyOnRight = (screen.width / 3) * 2 < centerX;
    if (isVerticallyOnUpside) {
      if (isHorizontallyOnLeft) {
        if (isHorizontal) {
          return PLACEMENT.RIGHT_TOP;
        }
        return PLACEMENT.BOTTOM_LEFT;
      }
      if (isHorizontallyOnCenter) {
        return PLACEMENT.BOTTOM;
      }
      if (isHorizontallyOnRight) {
        if (isHorizontal) {
          return PLACEMENT.LEFT_TOP;
        }
        return PLACEMENT.BOTTOM_RIGHT;
      }
    }
    if (isVerticallyOnMiddle) {
      if (isHorizontallyOnLeft || isHorizontallyOnCenter) {
        return PLACEMENT.RIGHT;
      }
      if (isHorizontallyOnRight) {
        return PLACEMENT.LEFT;
      }
    }
    if (isVerticallyOnDownside) {
      if (isHorizontallyOnLeft) {
        if (isHorizontal) {
          return PLACEMENT.RIGHT_BOTTOM;
        }
        return PLACEMENT.TOP_LEFT;
      }
      if (isHorizontallyOnCenter) {
        return PLACEMENT.TOP;
      }
      if (isHorizontallyOnRight) {
        if (isHorizontal) {
          return PLACEMENT.LEFT_BOTTOM;
        }
        return PLACEMENT.TOP_RIGHT;
      }
    }
    return PLACEMENT.BOTTOM_LEFT;
  }, [
    targetRef,
    screen.width,
    screen.height,
    isHorizontal,
    /* isOpened is required for re-rendering*/ isOpened,
  ]);

  const space = 8;

  // Position
  type Position = { x: number; y: number };
  const position = useMemo<Position>(() => {
    const targetElement = targetRef.current;
    if (!targetElement) {
      return { x: 0, y: 0 } as Position;
    }

    const rect = targetElement.getBoundingClientRect();
    const position: Position = { x: 0, y: 0 };
    switch (placement) {
      case PLACEMENT.TOP_LEFT:
        position.x = rect.left;
        position.y = rect.top - space;
        break;
      case PLACEMENT.TOP:
        position.x = rect.x + rect.width / 2;
        position.y = rect.top - space;
        break;
      case PLACEMENT.TOP_RIGHT:
        position.x = rect.right;
        position.y = rect.top - space;
        break;
      case PLACEMENT.RIGHT_TOP:
        position.x = rect.right + space;
        position.y = rect.top;
        break;
      case PLACEMENT.RIGHT:
        position.x = rect.right + space;
        position.y = rect.top + rect.height / 2;
        break;
      case PLACEMENT.RIGHT_BOTTOM:
        position.x = rect.right + space;
        position.y = rect.bottom;
        break;
      case PLACEMENT.BOTTOM_RIGHT:
        position.x = rect.right;
        position.y = rect.bottom + space;
        break;
      case PLACEMENT.BOTTOM:
        position.x = rect.x + rect.width / 2;
        position.y = rect.bottom + space;
        break;
      case PLACEMENT.BOTTOM_LEFT:
        position.x = rect.left;
        position.y = rect.bottom + space;
        break;
      case PLACEMENT.LEFT_BOTTOM:
        position.x = rect.left - space;
        position.y = rect.bottom;
        break;
      case PLACEMENT.LEFT:
        position.x = rect.left - space;
        position.y = rect.top - rect.height / 2;
        break;
      case PLACEMENT.LEFT_TOP:
        position.x = rect.left - space;
        position.y = rect.top;
        break;
    }
    return position;
  }, [
    targetRef,
    placement,
    /* isOpened is required for re-rendering*/ isOpened,
  ]);

  const content = useMemo<JSX.Element | null>(() => {
    switch (placement) {
      case PLACEMENT.TOP_LEFT: {
        return (
          <div
            className={styles.contentWrapper}
            style={{
              left: '0px',
              bottom:
                isScrollable && scrollDistance ? `${scrollDistance}px` : '0px',
              maxWidth: `${screen.width - position.x - space}px`,
              height: `${position.y - space}px`,
            }}
          >
            <div className={classnames(styles.content, styles.contentAlignEnd)}>
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.TOP: {
        const distance = Math.min(position.x, screen.width - position.x);
        return (
          <div
            className={styles.contentWrapper}
            style={{
              left: `-${distance - space}px`,
              bottom:
                isScrollable && scrollDistance ? `${scrollDistance}px` : '0px',
              width: `${(distance - space) * 2}px`,
              height: `${position.y - space}px`,
            }}
          >
            <div
              className={classnames(
                styles.content,
                styles.contentAlignEnd,
                styles.contentJustifyCenter
              )}
            >
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.TOP_RIGHT: {
        return (
          <div
            className={styles.contentWrapper}
            style={{
              right: '0px',
              bottom:
                isScrollable && scrollDistance ? `${scrollDistance}px` : '0px',
              maxWidth: `${position.x - space}px`,
              height: `${position.y - space}px`,
            }}
          >
            <div className={classnames(styles.content, styles.contentAlignEnd)}>
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.RIGHT_TOP: {
        return (
          <div
            className={styles.contentWrapper}
            style={{
              left: '0px',
              top:
                isScrollable && scrollDistance
                  ? `${scrollDistance * -1}px`
                  : '0px',
              maxWidth: `${screen.width - position.x - space}px`,
              height: `${screen.height - position.y - space}px`,
            }}
          >
            <div
              className={classnames(styles.content, styles.contentAlignStart)}
            >
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.RIGHT: {
        const distance = Math.min(position.y, screen.height - position.y);
        return (
          <div
            className={styles.contentWrapper}
            style={{
              left: '0px',
              top:
                isScrollable && scrollDistance
                  ? `${scrollDistance * -1 - (distance - space)}px`
                  : `-${distance - space}px`,
              maxWidth: `${screen.width - position.x - space}px`,
              height: `${(distance - space) * 2}px`,
            }}
          >
            <div
              className={classnames(styles.content, styles.contentAlignCenter)}
            >
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.RIGHT_BOTTOM: {
        return (
          <div
            className={styles.contentWrapper}
            style={{
              left: '0px',
              bottom:
                isScrollable && scrollDistance ? `${scrollDistance}px` : '0px',
              maxWidth: `${screen.width - position.x - space}px`,
              height: `${position.y - space}px`,
            }}
          >
            <div className={classnames(styles.content, styles.contentAlignEnd)}>
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.BOTTOM_RIGHT: {
        return (
          <div
            className={styles.contentWrapper}
            style={{
              right: '0px',
              top:
                isScrollable && scrollDistance
                  ? `${scrollDistance * -1}px`
                  : '0px',
              maxWidth: `${position.x - space}px`,
              height: `${screen.height - position.y - space}px`,
            }}
          >
            <div
              className={classnames(styles.content, styles.contentAlignStart)}
            >
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.BOTTOM: {
        const distance = Math.min(position.x, screen.width - position.x);
        return (
          <div
            className={styles.contentWrapper}
            style={{
              left: `-${distance - space}px`,
              top:
                isScrollable && scrollDistance
                  ? `${scrollDistance * -1}px`
                  : '0px',
              width: `${(distance - space) * 2}px`,
              height: `${screen.height - position.y - space}px`,
            }}
          >
            <div
              className={classnames(
                styles.content,
                styles.contentAlignStart,
                styles.contentJustifyCenter
              )}
            >
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.BOTTOM_LEFT: {
        return (
          <div
            className={styles.contentWrapper}
            style={{
              left: '0px',
              top:
                isScrollable && scrollDistance
                  ? `${scrollDistance * -1}px`
                  : '0px',
              maxWidth: `${screen.width - position.x - space}px`,
              height: `${screen.height - position.y - space}px`,
            }}
          >
            <div
              className={classnames(styles.content, styles.contentAlignStart)}
            >
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.LEFT_BOTTOM: {
        return (
          <div
            className={styles.contentWrapper}
            style={{
              right: '0px',
              bottom:
                isScrollable && scrollDistance ? `${scrollDistance}px` : '0px',
              maxWidth: `${position.x - space}px`,
              height: `${position.y - space}px`,
            }}
          >
            <div
              className={classnames(
                styles.content,
                styles.contentAlignEnd,
                styles.contentJustifyEnd
              )}
            >
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.LEFT: {
        const distance = Math.min(position.y, screen.height - position.y);
        return (
          <div
            className={styles.contentWrapper}
            style={{
              right: '0px',
              top:
                isScrollable && scrollDistance
                  ? `${scrollDistance * -1 - (distance - space)}px`
                  : `-${distance - space}px`,
              maxWidth: `${position.x - space}px`,
              height: `${(distance - space) * 2}px`,
            }}
          >
            <div
              className={classnames(
                styles.content,
                styles.contentAlignCenter,
                styles.contentJustifyEnd
              )}
            >
              {children}
            </div>
          </div>
        );
      }
      case PLACEMENT.LEFT_TOP: {
        return (
          <div
            className={styles.contentWrapper}
            style={{
              right: '0px',
              top:
                isScrollable && scrollDistance
                  ? `${scrollDistance * -1}px`
                  : '0px',
              maxWidth: `${position.x - space}px`,
              height: `${screen.height - position.y - space}px`,
            }}
          >
            <div
              className={classnames(
                styles.content,
                styles.contentAlignStart,
                styles.contentJustifyEnd
              )}
            >
              {children}
            </div>
          </div>
        );
      }
    }
  }, [
    placement,
    position.x,
    position.y,
    screen.width,
    screen.height,
    children,
    scrollDistance,
  ]);

  if (!isOpened) {
    return null;
  }

  return (
    <Portal target={TARGET.POPOVER}>
      <div
        className={styles.root}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onClick={handleClick}
      >
        {content}
      </div>
    </Portal>
  );
};

export type UsePopoverReturn<T extends HTMLElement> = {
  open: () => void;
  close: () => void;
  targetRef: React.RefObject<T>;
  bind: {
    isOpened: PopoverProps['isOpened'];
    isHorizontal: PopoverProps['isHorizontal'];
    onRequestClose: PopoverProps['onRequestClose'];
    targetRef: React.RefObject<T>;
  };
};
export const usePopover = function <T extends HTMLElement>(
  {
    isHorizontal,
  }: {
    isHorizontal: Partial<PopoverProps['isHorizontal']>;
  } = {
    isHorizontal: false,
  }
): UsePopoverReturn<T> {
  const [isOpened, setIsOpened] =
    useState<UsePopoverReturn<T>['bind']['isOpened']>(false);
  const handleRequestClose = useCallback<
    UsePopoverReturn<T>['bind']['onRequestClose']
  >(() => {
    setIsOpened(false);
  }, []);
  const open = useCallback<UsePopoverReturn<T>['open']>(() => {
    setIsOpened(true);
  }, []);
  const close = useCallback<UsePopoverReturn<T>['open']>(() => {
    setIsOpened(false);
  }, []);
  const targetRef = useRef<T>(null);

  const ret = useMemo<UsePopoverReturn<T>>(
    () => ({
      open,
      close,
      targetRef,
      bind: {
        isOpened,
        isHorizontal,
        onRequestClose: handleRequestClose,
        targetRef,
      },
    }),
    [open, close, isOpened, handleRequestClose]
  );
  return ret;
};
