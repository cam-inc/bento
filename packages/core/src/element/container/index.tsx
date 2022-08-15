import React, { useCallback, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Path, Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';
import { Popover, usePopover } from '../../portals/popover';
import { Toolbar } from '../../toolbar';
import { styles } from './index.css';

export type ElementContainerProps = RenderElementProps
export const ElementContainer: React.FC<ElementContainerProps> = (props) => {
  const editor = useSlate();

  const path = useMemo(() => {
    const path = ReactEditor.findPath(editor, props.element);
    return path;
  }, [editor, props.element]);

  const popover = usePopover<HTMLButtonElement>();

  const handleAddButtonClick = useCallback(() => {
    popover.open();
  }, [popover]);


  const [{ isDragging }, dragRef] = useDrag(() => {
    return {
      type: 'Element',
      item: {
        from: path,
        element: props.element,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
    };
  }, [path]);

  const [, dropRef] = useDrop(() => {
    const path = ReactEditor.findPath(editor, props.element);
    return {
      accept: 'Element',
      drop: (item: { from: Path }) => {
        Transforms.moveNodes(editor, {
          at: item.from,
          to: path
        })
      }
    }
  }, [editor, props.element]);

  return (
    <>
      <div {...props.attributes} className={styles.root}>
        <div contentEditable={false} className={styles.utils}>
          <button ref={popover.targetRef} onClick={handleAddButtonClick}>add</button>
          <button contentEditable={false} ref={dragRef}>drag</button>
          <div contentEditable={false} ref={dropRef}>drop</div>
        </div>
        <div>{props.children}</div>
      </div>
      <Popover {...popover.bind}>
        <Toolbar path={path} />
      </Popover>
    </>
  );
};
