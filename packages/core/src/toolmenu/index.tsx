import { useCallback } from 'react';
import { Node, Path } from 'slate';
import { useSlate } from 'slate-react';
import { CopyIcon } from '../components/icons/copy';
import { DustboxIcon } from '../components/icons/dustbox';
import { styles } from './index.css';

export type ToolmenuProps = {
  path: Path;
  onDone: () => void;
};
export const Toolmenu: React.FC<ToolmenuProps> = ({ path, onDone }) => {
  const editor = useSlate();

  const handleDeleteClick = useCallback(() => {
    editor.removeNodes({
      at: path,
    });
    onDone();
  }, [editor, path, onDone]);

  const handleCopyClick = useCallback(() => {
    const node = Node.get(editor, path);
    // TODO: There seems to be no API for copying. Replace this workaround if any found.
    const copiedNode = JSON.parse(JSON.stringify(node));
    editor.insertNodes(copiedNode, {
      at: Path.next(path),
    });
    onDone();
  }, [editor, path, onDone]);

  return (
    <div className={styles.root}>
      <div>
        <ul className={styles.list}>
          <li>
            <button
              type="button"
              className={styles.button}
              onClick={handleDeleteClick}
            >
              <div className={styles.buttonBG} />
              <div className={styles.buttonContainer}>
                <div className={styles.buttonIcon}>
                  <DustboxIcon />
                </div>
                <div className={styles.buttonTitle}>削除</div>
              </div>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={styles.button}
              onClick={handleCopyClick}
            >
              <div className={styles.buttonBG} />
              <div className={styles.buttonContainer}>
                <div className={styles.buttonIcon}>
                  <CopyIcon />
                </div>
                <div className={styles.buttonTitle}>コピー</div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
