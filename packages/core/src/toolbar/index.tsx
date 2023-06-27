import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Node, Path, Range } from 'slate';
import { useSlate } from 'slate-react';
import { Config, PickRequired } from '../config';
import { Popover, usePopover } from '../portals/popover';
import { useConfigGlobalStateValue } from '../store';
import { Toolbox } from '../toolbox';
import { Toolmenu } from '../toolmenu';
import { styles } from './index.css';

export type CustomNode = Config['elements'][number] | Config['texts'][number];

export type ButtonBoxProps = {
  onClick: React.MouseEventHandler;
  name?: string;
  featureIcon?: React.ReactNode;
};
export const ButtonBox: React.FC<ButtonBoxProps> = ({
  onClick,
  name,
  featureIcon,
}) => {
  return (
    <button type="button" className={styles.buttonBox} onClick={onClick}>
      <div className={styles.bg} />
      {featureIcon && <span className={styles.featureIcon}>{featureIcon}</span>}
      {name && <span>{name}</span>}
      <span className={styles.dropDownIcon}>
        <svg viewBox="0 0 20 20">
          <path d="M10 12L6 8H14L10 12Z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
};

export type ToolbarProps = {};
export const Toolbar: React.FC<ToolbarProps> = () => {
  const toolBarRef = useRef<HTMLDivElement>(null);
  const editor = useSlate();

  const popover = usePopover<HTMLDivElement>();
  const [rect, setRect] = useState<DOMRect>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const popoverTransform = usePopover<HTMLLIElement>();
  const popoverMore = usePopover<HTMLLIElement>();
  const [path, setPath] = useState<Path>([0]);
  const [node, setNode] = useState<Node | CustomNode | null>(null);
  const [blockName, setBlockName] = useState('ブロックを選択');
  const [isMouseDown, setIsMouseDown] = useState(false);

  const hasToolbox = useCallback(
    (
      node: Node | CustomNode | PickRequired<CustomNode, 'toolbox'> | null
    ): node is PickRequired<CustomNode, 'toolbox'> => {
      return (
        node !== null && Object.prototype.hasOwnProperty.call(node, 'toolbox')
      );
    },
    [node]
  );

  const handleTransformClick = useCallback(() => {
    popoverTransform.open();
  }, [popoverTransform]);
  const handleTransformDone = useCallback(() => {
    popoverTransform.close();
    popover.close();
    setBlockName('ブロックを選択');
  }, [popoverTransform]);

  const handleMoreClick = useCallback(() => {
    popoverMore.open();
  }, [popoverMore]);
  const handleMoreDone = useCallback(() => {
    popoverMore.close();
    popover.close();
  }, [popoverMore]);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };
    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const { selection } = editor;
    if (selection?.anchor !== undefined) {
      const path = selection.anchor.path;
      setPath(path);
      setNode(Node.get(editor, Path.parent(path)));
    }

    const isToShow = (() => {
      if (
        window.getSelection()?.isCollapsed ||
        !selection ||
        Range.isCollapsed(selection) ||
        editor.string(selection) === '' ||
        (!isVisible && isMouseDown)
      ) {
        return false;
      }
      return true;
    })();

    if (!isToShow) {
      setIsVisible(false);
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection?.rangeCount) {
      setIsVisible(false);
      return;
    }
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    if (rect) {
      setRect(rect);
      setIsVisible(true);
    }

    const toolbarHeight = toolBarRef.current?.getBoundingClientRect().height;
    if (toolbarHeight) {
      const space = 10;
      const scrollStartHeight = toolbarHeight + space;
      if (rect.top < scrollStartHeight)
        window.scrollBy(0, -(scrollStartHeight - rect.top));
    }
  }, [editor.selection, isMouseDown]);

  useEffect(() => {
    if (hasToolbox(node)) {
      setBlockName(node.toolbox.title);
    }
  }, [node]);

  useEffect(() => {
    if (isVisible) {
      popover.open();
    } else {
      popover.close();
    }
  }, [popover, isVisible]);

  const config = useConfigGlobalStateValue();

  return (
    <>
      <div
        ref={popover.targetRef}
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          width: `${rect?.width}px`,
          height: `${rect?.height}px`,
          top: `${rect?.top}px`,
          left: `${rect?.left}px`,
        }}
      />
      <Popover {...popover.bind} placement="TopLeft" isScrollable>
        <div className={styles.root} ref={toolBarRef}>
          <ul className={styles.list}>
            <li className={styles.item} ref={popoverTransform.targetRef}>
              <ButtonBox name={blockName} onClick={handleTransformClick} />
            </li>
            {config.texts.map(
              (text) =>
                text.toolbar && (
                  <Fragment key={text.type}>
                    <li className={styles.item}>
                      <text.toolbar.Component editor={editor} />
                    </li>
                  </Fragment>
                )
            )}
            <li className={styles.item} ref={popoverMore.targetRef}>
              <button
                type="button"
                className={styles.moreButton}
                onClick={handleMoreClick}
              >
                <div className={styles.bg} />
                <svg viewBox="0 0 20 20" className={styles.moreButtonIcon}>
                  <path
                    d="M10.5 16C10.0833 16 9.72933 15.854 9.438 15.562C9.146 15.2707 9 14.9167 9 14.5C9 14.0833 9.146 13.7293 9.438 13.438C9.72933 13.146 10.0833 13 10.5 13C10.9167 13 11.2707 13.146 11.562 13.438C11.854 13.7293 12 14.0833 12 14.5C12 14.9167 11.854 15.2707 11.562 15.562C11.2707 15.854 10.9167 16 10.5 16ZM10.5 11.5C10.0833 11.5 9.72933 11.354 9.438 11.062C9.146 10.7707 9 10.4167 9 10C9 9.58333 9.146 9.22933 9.438 8.938C9.72933 8.646 10.0833 8.5 10.5 8.5C10.9167 8.5 11.2707 8.646 11.562 8.938C11.854 9.22933 12 9.58333 12 10C12 10.4167 11.854 10.7707 11.562 11.062C11.2707 11.354 10.9167 11.5 10.5 11.5ZM10.5 7C10.0833 7 9.72933 6.854 9.438 6.562C9.146 6.27067 9 5.91667 9 5.5C9 5.08333 9.146 4.72933 9.438 4.438C9.72933 4.146 10.0833 4 10.5 4C10.9167 4 11.2707 4.146 11.562 4.438C11.854 4.72933 12 5.08333 12 5.5C12 5.91667 11.854 6.27067 11.562 6.562C11.2707 6.854 10.9167 7 10.5 7Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </Popover>
      <Popover {...popoverTransform.bind}>
        <Toolbox
          path={path}
          onDone={handleTransformDone}
          node={node}
          setNode={setNode}
          isInToolbar
        />
      </Popover>
      <Popover {...popoverMore.bind}>
        <Toolmenu path={Path.parent(path)} onDone={handleMoreDone} />
      </Popover>
    </>
  );
};
