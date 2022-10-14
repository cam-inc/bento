import { useCallback, useMemo, useState } from 'react';
import { Portal, TARGET } from '../../portals';
import { styles } from './index.css';

export type ModalProps = {
  isOpened: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
};
export const Modal: React.FC<ModalProps> = ({
  isOpened,
  onRequestClose,
  children,
}) => {
  const handleCloseClick = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  if (!isOpened) {
    return null;
  }

  return (
    <Portal target={TARGET.MODAL}>
      <div className={styles.root}>
        <div>
          <button onClick={handleCloseClick}>close</button>
        </div>
        <div>{children}</div>
      </div>
    </Portal>
  );
};

export type UseModalReturn = {
  open: () => void;
  close: () => void;
  bind: {
    isOpened: ModalProps['isOpened'];
    onRequestClose: ModalProps['onRequestClose'];
  };
};
export const useModal = (): UseModalReturn => {
  const [isOpened, setIsOpened] =
    useState<UseModalReturn['bind']['isOpened']>(false);
  const handleRequestClose = useCallback<
    UseModalReturn['bind']['onRequestClose']
  >(() => {
    setIsOpened(false);
  }, []);
  const open = useCallback<UseModalReturn['open']>(() => {
    setIsOpened(true);
  }, []);
  const close = useCallback<UseModalReturn['close']>(() => {
    setIsOpened(false);
  }, []);

  const ret = useMemo<UseModalReturn>(
    () => ({
      open,
      close,
      bind: {
        isOpened,
        onRequestClose: handleRequestClose,
      },
    }),
    [open, close, isOpened, handleRequestClose]
  );
  return ret;
};
