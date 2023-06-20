import { useCallback } from 'react';
import { Path } from 'slate';
import { useSlate } from 'slate-react';
import { CopyIcon } from '../components/icons/copy';
import { DustboxIcon } from '../components/icons/dustbox';
import { styles } from './index.css';
import { Text } from 'slate';
import { helpers } from '../helpers';

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

  const handleCopyClick = useCallback(async () => {
    const selection = editor.selection;
    if (!selection || selection.anchor.offset === selection.focus.offset) {
      const textNodeList = Array.from(
        editor.nodes({
          at: path,
          match: (node) => Text.isText(node),
        })
      );
      if (!textNodeList.length) {
        return;
      }

      const [lastTextNode, lastTextPath] =
        textNodeList[textNodeList.length - 1];
      if (!Text.isText(lastTextNode)) {
        return;
      }

      const lastOffset = lastTextNode.text.length;
      if (!lastOffset) {
        onDone();
        return;
      }

      editor.selection = {
        anchor: {
          path: [...path, 0],
          offset: 0,
        },
        focus: {
          path: lastTextPath,
          offset: lastOffset,
        },
      };
      await helpers.nodeHelpers.copySelectedNodeToClipBoard(editor);

      const headLinePoint = {
        path: [...path, 0],
        offset: 0,
      };
      editor.selection = {
        anchor: headLinePoint,
        focus: headLinePoint,
      };
    } else {
      helpers.nodeHelpers.copySelectedNodeToClipBoard(editor);
    }
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
