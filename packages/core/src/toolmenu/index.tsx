import { useCallback } from 'react';
import { Element, Node, Path } from 'slate';
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
      const node = Node.get(editor, path);
      if (!Element.isElement(node)) return;
      const lastChildIndex = node.children.length - 1;
      const lastNode = node.children[lastChildIndex];
      if (!Text.isText(lastNode)) return;
      const lastOffset = lastNode.text.length;
      editor.selection = {
        anchor: {
          path: [...path, 0],
          offset: 0,
        },
        focus: {
          path: [...path, lastChildIndex],
          offset: lastOffset,
        },
      };
      await helpers.Node.copyNode(editor);
      editor.selection = {
        anchor: {
          path: [...path, 0],
          offset: 0,
        },
        focus: {
          path: [...path, 0],
          offset: 0,
        },
      };
    } else {
      helpers.Node.copyNode(editor);
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
