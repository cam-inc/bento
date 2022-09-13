import React, { useEffect, useState } from 'react';
import { Editor, Range } from 'slate';
import { useFocused, useSlate } from 'slate-react';
import { Popover, usePopover } from '../portals/popover';
import { useConfigGlobalStateValue } from '../store';
import { styles } from './index.css';

export type ToolbarProps = {};
export const Toolbar: React.FC<ToolbarProps> = () => {
  const editor = useSlate();
  const isFocused = useFocused();

  const popover = usePopover<HTMLDivElement>();
  const [rect, setRect] = useState<DOMRect>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const { selection } = editor;

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
            {config.texts.map((text) => (
              <React.Fragment key={text.type}>
                <li className={styles.item}>
                  {text.toolbar && <text.toolbar.Component editor={editor} />}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </Popover>
    </>
  );
};
