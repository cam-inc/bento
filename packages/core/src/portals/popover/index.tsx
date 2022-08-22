import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Portal, TARGET } from '../../portals';
import { useScreenGlobalStateValue } from '../../store';
import { styles } from './index.css';

// Which point of the target element the popover should be placed.
const PLACEMENT = {
  TOP_LEFT: 'TopLeft',
  TOP: 'Top',
  TOP_RIGHT: 'TopRight',
  BOTTOM_RIGHT: 'BottomRight',
  BOTTOM: 'Bottom',
  BOTTOM_LEFT: 'BottomLeft',
} as const;
type Placement = typeof PLACEMENT[keyof typeof PLACEMENT];

type PopoverProps = {
  isOpened: boolean;
  onRequestClose: () => void;
  // Target element ref for a popover to be placed.
  targetRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
};

// TODO: desktop and mobile layout
export const Popover: React.FC<PopoverProps> = ({ isOpened, onRequestClose, targetRef, children }) => {
  const screen = useScreenGlobalStateValue();

  // Auto closing.
  useEffect(() => {
    const handler = (e: Event) => {
      // Do nothing when the event has been dispatched from elements inside the target element.
      if (targetRef.current?.contains(e.target as Node)) {
        return;
      }
      onRequestClose();
    };
    window.addEventListener('click', handler);
    window.addEventListener('scroll', handler);
    const cleanup = () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('scroll', handler);
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
    const targetElement = targetRef.current;
    if (!targetElement) {
      return PLACEMENT.TOP;
    }
    const rect = targetElement.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    const isVerticallyOnUpside = centerY <= screen.height / 2;
    const isVerticallyOnDownside = !isVerticallyOnUpside;
    const isHorizontallyOnLeft = centerX < screen.width / 3;
    const isHorizontallyOnCenter =
      screen.width / 3 <= centerX && centerX <= (screen.width / 3) * 2;
    const isHorizontallyOnRight = (screen.width / 3) * 2 < centerX;
    if (isHorizontallyOnLeft) {
      if (isVerticallyOnUpside) {
        return PLACEMENT.BOTTOM_LEFT;
      }
      if (isVerticallyOnDownside) {
        return PLACEMENT.TOP_LEFT;
      }
    }
    if (isHorizontallyOnCenter) {
      if (isVerticallyOnUpside) {
        return PLACEMENT.BOTTOM;
      }
      if (isVerticallyOnDownside) {
        return PLACEMENT.TOP;
      }
    }
    if (isHorizontallyOnRight) {
      if (isVerticallyOnUpside) {
        return PLACEMENT.BOTTOM_RIGHT;
      }
      if (isVerticallyOnDownside) {
        return PLACEMENT.TOP_RIGHT;
      }
    }
    return PLACEMENT.TOP;
  }, [targetRef, screen, isOpened]);

  // Position
  type Position = { x: number; y: number };
  const position = useMemo<Position>(() => {
    const targetElement = targetRef.current;
    if (!targetElement) {
      return { x: 0, y: 0 } as Position;
    }

    const space = 8;
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
    }
    return position;
  }, [targetRef, placement, isOpened]);

  const content = useMemo<JSX.Element | null>(() => {
    const space = 8;
    // TODO: styleとclassNameを調整すること。
    switch (placement) {
      case PLACEMENT.TOP_LEFT: {
        return (
          <div
            className={styles.content}
            style={{
              position: 'absolute',
              left: '0px',
              bottom: '0px',
              maxWidth: `${screen.width - position.x - space}px`,
              maxHeight: `${position.y - space}px`,
            }}
          >
            {children}
          </div>
        );
      }
      case PLACEMENT.TOP: {
        const baseWidth =
          Math.min(position.x, screen.width - position.x) - space;
        return (
          <div
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              left: `${-baseWidth}px`,
              bottom: '0px',
              width: `${baseWidth * 2}px`,
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <div
                className={styles.content}
                style={{
                  flex: 'none',
                  pointerEvents: 'auto',
                  maxWidth: `${baseWidth * 2}px`,
                  maxHeight: `${position.y - space}px`,
                }}
              >
                {children}
              </div>
            </div>
          </div>
        );
      }
      case PLACEMENT.TOP_RIGHT: {
        return (
          <div
            className={styles.content}
            style={{
              position: 'absolute',
              right: '0px',
              bottom: '0px',
              maxWidth: `${position.x - space}px`,
              maxHeight: `${position.y - space}px`,
            }}
          >
            {children}
          </div>
        );
      }
      case PLACEMENT.BOTTOM_RIGHT: {
        return (
          <div
            className={styles.content}
            style={{
              position: 'absolute',
              right: '0px',
              top: '0px',
              maxWidth: `${position.x - space}px`,
              maxHeight: `${screen.height - position.y - space}px`,
            }}
          >
            {children}
          </div>
        );
      }
      case PLACEMENT.BOTTOM: {
        const baseWidth =
          Math.min(position.x, screen.width - position.x) - space;
        return (
          <div
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              left: `${-baseWidth}px`,
              top: '0px',
              width: `${baseWidth * 2}px`,
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <div
                className={styles.content}
                style={{
                  flex: 'none',
                  pointerEvents: 'auto',
                  maxWidth: `${baseWidth * 2}px`,
                  maxHeight: `${screen.height - position.y - space}px`,
                }}
              >
                {children}
              </div>
            </div>
          </div>
        );
      }
      case PLACEMENT.BOTTOM_LEFT: {
        return (
          <div
            className={styles.content}
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              maxWidth: `${screen.width - position.x - space}px`,
              maxHeight: `${screen.height - position.y - space}px`,
            }}
          >
            {children}
          </div>
        );
      }
    }
  }, [placement, position, screen.width, screen.height, children]);

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
}

export type UsePopoverReturn<T extends HTMLElement> = {
  open: () => void;
  close: () => void;
  targetRef: React.RefObject<T>;
  bind: {
    isOpened: PopoverProps['isOpened'];
    onRequestClose: PopoverProps['onRequestClose'];
    targetRef: React.RefObject<T>;
  };
};
export const usePopover = function <T extends HTMLElement>(): UsePopoverReturn<T> {
  const [isOpened, setIsOpened] = useState<UsePopoverReturn<T>['bind']['isOpened']>(false);
  const handleRequestClose = useCallback<UsePopoverReturn<T>['bind']['onRequestClose']>(() => {
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
        onRequestClose: handleRequestClose,
        targetRef,
      },
    }),
    [open, close, isOpened, handleRequestClose]
  );
  return ret;

}
