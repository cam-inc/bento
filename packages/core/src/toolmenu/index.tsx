import React, { useCallback } from 'react';
import { Path } from 'slate';
import { CopyIcon } from '../components/icons/copy';
import { DustboxIcon } from '../components/icons/dustbox';
import { styles } from './index.css';

export type ToolmenuProps = {
  path: Path;
}
export const Toolmenu: React.FC<ToolmenuProps> = (/*{ path }*/) => {
  const handleDeleteClick = useCallback(() => { }, [
    // TODO
  ]);
  const handleCopyClick = useCallback(() => { }, [
    // TODO
  ]);

  return (
    <div className={styles.root}>
      <div>
        <ul>
          <li>
            <button className={styles.button}
              onClick={handleDeleteClick}
            >
              <div className={styles.buttonBG} />
              <div className={styles.buttonContainer}>
                <div className={styles.buttonIcon}>
                  <DustboxIcon />
                </div>
                <div className={styles.buttonTitle}>
                  削除
                </div>
              </div>
            </button>
          </li>
          <li>
            <button className={styles.button}
              onClick={handleCopyClick}
            >
              <div className={styles.buttonBG} />
              <div className={styles.buttonContainer}>
                <div className={styles.buttonIcon}>
                  <CopyIcon />
                </div>
                <div className={styles.buttonTitle}>
                  コピー
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
