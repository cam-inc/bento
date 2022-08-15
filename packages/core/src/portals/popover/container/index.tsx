import React from 'react';
import { TARGET } from '../../../portals';
import { styles } from './index.css';

export type PopoverContainerProps = {};
export const PopoverContainer: React.FC<PopoverContainerProps> = () => {
  return (
    <div id={TARGET.POPOVER} className={styles.root} />
  );
};
