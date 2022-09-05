import React, { useCallback, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Path, Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';
import { DotsIcon } from '../../components/icons/dots';
import { PlusIcon } from '../../components/icons/plus';
import { Popover, usePopover } from '../../portals/popover';
import { Toolbox } from '../../toolbox';
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

  const [_, dragRef] = useDrag(() => {
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
      <div {...props.attributes} data-type={props.element.type} className={styles.root}>
        <div className={styles.body}>{props.children}</div>
        <div contentEditable={false} className={styles.utilsContainer}>
          <div className={styles.utils}>
            <button className={styles.button} ref={popover.targetRef} onClick={handleAddButtonClick}>
              <PlusIcon />
            </button>
            <button className={styles.button} ref={dragRef}>
              <DotsIcon />
            </button>
            <div ref={dropRef}>drop</div>
          </div>
        </div>

      </div>
      <Popover {...popover.bind}>
        <Toolbox path={path} />
      </Popover>
    </>
  );
};
