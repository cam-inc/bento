import React from 'react';
import { TARGET } from '../../../portals';
import { styles } from './index.css';

export type ModalContainerProps = {};
export const ModalContainer: React.FC<ModalContainerProps> = () => {
  return <div id={TARGET.MODAL} className={styles.root} />;
};
