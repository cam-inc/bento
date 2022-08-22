import React, { useEffect, useState } from 'react';
import { Editor, Range } from 'slate';
import { useFocused, useSlate } from 'slate-react';
import { Popover, usePopover } from '../portals/popover';
import { useConfigGlobalStateValue } from '../store';

export type ToolbarProps = {};
export const Toolbar: React.FC<ToolbarProps> = () => {
  const editor = useSlate();
  const isFocused = useFocused();
  const popover = usePopover<HTMLDivElement>();

  const [rect, setRect] = useState<DOMRect>();

  useEffect(() => {
    const { selection } = editor;

    const isToShow = (() => {
      if (!isFocused || !selection || Range.isCollapsed(selection) || Editor.string(editor, selection) === '') {
        return false;
      }
      return true;
    })();

    if (!isToShow) {
      return;
    }

    const domSelection = window.getSelection()
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    if (rect) {
      setRect(rect);
    }
    popover.open();
  }, [isFocused, editor.selection]);

  const config = useConfigGlobalStateValue();

  return (
    <>
      <div ref={popover.targetRef} style={{
        pointerEvents: 'none',
        position: 'fixed',
        width: `${rect?.width}px`,
        height: `${rect?.height}px`,
        top: `${rect?.top}px`,
        left: `${rect?.left}px`,
      }} />
      <Popover {...popover.bind}>
        <div>{config.texts.map(text => (
          <React.Fragment key={text.type}>
            <text.toolbar.Icon />
          </React.Fragment>
        ))}</div>
      </Popover>
    </>
  )
};
