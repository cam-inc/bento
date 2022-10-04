import React, { useCallback, useEffect, useState } from 'react';
import { Editor, Range, Path, Node } from 'slate';
import { useFocused, useSlate } from 'slate-react';
import { Config } from '../config';
import { Popover, usePopover } from '../portals/popover';
import { useConfigGlobalStateValue } from '../store';
import { Toolbox } from '../toolbox';
import { Toolmenu } from '../toolmenu';
import { styles } from './index.css';

type ButtonBoxProps = {
  featureIcon: React.ReactNode;
  onClick: React.MouseEventHandler;
  name?: string;
};

const ButtonBox: React.FC<ButtonBoxProps> = ({
  featureIcon,
  onClick,
  name,
}) => {
  return (
    <button className={styles.buttonBox} onClick={onClick}>
      <span className={styles.featureIcon}>{featureIcon}</span>
      {name && <span>{name}</span>}
      <span className={styles.dropDownIcon}>
        <svg viewBox="0 0 20 20">
          <path d="M10 12L6 8H14L10 12Z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
};

export type CustomNode = Config['elements'][number] | Config['texts'][number];

export type ToolbarProps = {};

export const Toolbar: React.FC<ToolbarProps> = () => {
  const editor = useSlate();
  const isFocused = useFocused();

  const popover = usePopover<HTMLDivElement>();
  const [rect, setRect] = useState<DOMRect>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const popoverTransform = usePopover<HTMLLIElement>();
  const popoverLink = usePopover<HTMLLIElement>();
  const popoverColor = usePopover<HTMLLIElement>();
  const popoverMore = usePopover<HTMLLIElement>();
  const [path, setPath] = useState<Path>([0]);
  const [node, setNode] = useState<Node | CustomNode | null>(null);
  const [blockIcon, setBlockIcon] = useState<React.ReactNode | null>(null);
  const [blockName, setBlockName] = useState('ブロックを選択');

  const hasToolbox = useCallback(
    (node: Node | CustomNode | null): node is CustomNode => {
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
    setBlockIcon(null);
  }, [popoverTransform]);

  const handleLinkClick = useCallback(() => {
    popoverLink.open();
  }, [popoverLink]);
  const handleLinkDone = useCallback(() => {
    popoverLink.close();
  }, [popoverLink]);

  const handleColorClick = useCallback(() => {
    popoverColor.open();
  }, [popoverColor]);
  const handleColorDone = useCallback(() => {
    popoverColor.close();
  }, [popoverColor]);

  const handleMoreClick = useCallback(() => {
    popoverMore.open();
  }, [popoverMore]);
  const handleMoreDone = useCallback(() => {
    popoverMore.close();
    popover.close();
  }, [popoverMore]);

  useEffect(() => {
    const { selection } = editor;

    if (selection?.anchor !== undefined) {
      const path = selection.anchor.path;
      setPath(path);
      setNode(Node.get(editor, Path.parent(path)));
    }

    const isToShow = (() => {
      if (
        !isFocused ||
        !selection ||
        Range.isCollapsed(selection) ||
        Editor.string(editor, selection) === ''
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
  }, [isFocused, editor.selection]);

  useEffect(() => {
    if (hasToolbox(node) && node.toolbox !== undefined) {
      setBlockIcon(<node.toolbox.Icon />);
      setBlockName(node.toolbox.title);
    }
  }, [node]);

  useEffect(() => {
    if (isVisible) {
      popover.open();
    } else {
      // TODO
      //popover.close();
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
      <Popover {...popover.bind}>
        <div className={styles.root}>
          <ul className={styles.list}>
            <li className={styles.item} ref={popoverTransform.targetRef}>
              <ButtonBox
                name={blockName}
                featureIcon={blockIcon}
                onClick={handleTransformClick}
              />
            </li>
            <li className={styles.item} ref={popoverLink.targetRef}>
              <ButtonBox
                name="リンク"
                featureIcon={
                  <svg viewBox="0 0 20 20">
                    <path
                      d="M9.5 18C8.222 18 7.15267 17.545 6.292 16.635C5.43067 15.7257 5 14.639 5 13.375V5.271C5 4.36833 5.316 3.59733 5.948 2.958C6.58 2.31933 7.34733 2 8.25 2C9.18067 2 9.955 2.33667 10.573 3.01C11.191 3.684 11.5 4.47933 11.5 5.396V13.021C11.5 13.5763 11.302 14.045 10.906 14.427C10.51 14.809 10.0413 15 9.5 15C8.91667 15 8.43733 14.7917 8.062 14.375C7.68733 13.9583 7.5 13.4723 7.5 12.917V5H9V13.021C9 13.1597 9.04867 13.2777 9.146 13.375C9.24333 13.4723 9.36133 13.521 9.5 13.521C9.63867 13.521 9.75667 13.4723 9.854 13.375C9.95133 13.2777 10 13.1597 10 13.021V5.271C10 4.785 9.83 4.36833 9.49 4.021C9.14933 3.67367 8.736 3.5 8.25 3.5C7.764 3.5 7.35067 3.677 7.01 4.031C6.67 4.385 6.5 4.812 6.5 5.312V13.521C6.5 14.3543 6.795 15.059 7.385 15.635C7.97567 16.2117 8.68067 16.5 9.5 16.5C10.3613 16.5 11.0767 16.1943 11.646 15.583C12.2153 14.9723 12.5 14.2503 12.5 13.417V5H14V13.521C14 14.771 13.566 15.83 12.698 16.698C11.83 17.566 10.764 18 9.5 18Z"
                      fill="currentColor"
                    />
                  </svg>
                }
                onClick={handleLinkClick}
              />
            </li>
            {config.texts.map(
              (text) =>
                text.toolbar && (
                  <React.Fragment key={text.type}>
                    <li className={styles.item}>
                      <text.toolbar.Component editor={editor} />
                    </li>
                  </React.Fragment>
                )
            )}
            <li className={styles.item} ref={popoverColor.targetRef}>
              <ButtonBox
                featureIcon={
                  <svg viewBox="0 0 20 20">
                    <path
                      d="M1.625 17.5V14.083H18.375V17.5H1.625ZM4.562 11.667L8.938 0H11.062L15.438 11.667H13.354L12.333 8.771H7.667L6.646 11.667H4.562ZM8.292 7H11.708L10.042 2.312H9.958L8.292 7Z"
                      fill="currentColor"
                    />
                  </svg>
                }
                onClick={handleColorClick}
              />
            </li>
            <li className={styles.item} ref={popoverMore.targetRef}>
              <button className={styles.moreButton} onClick={handleMoreClick}>
                <svg viewBox="0 0 20 20">
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
