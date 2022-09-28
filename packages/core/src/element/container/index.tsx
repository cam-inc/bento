import classnames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Path, Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';
import { Button } from '../../components/button';
import { DotsIcon } from '../../components/icons/dots';
import { PlusIcon } from '../../components/icons/plus';
import { Popover, usePopover } from '../../portals/popover';
import { Toolbox } from '../../toolbox';
import { Toolmenu } from '../../toolmenu';
import { styles } from './index.css';

export type ElementContainerProps = RenderElementProps;

export const ElementContainer: React.FC<ElementContainerProps> = (props) => {
  const editor = useSlate();
  const path = useMemo(
    () => ReactEditor.findPath(editor, props.element),
    [JSON.stringify(editor), JSON.stringify(props.element)]
  );

  const popoverToolbox = usePopover<HTMLDivElement>();
  const handlePlusButtonClick = useCallback(() => {
    popoverToolbox.open();
  }, [popoverToolbox]);

  const popoverToolmenu = usePopover<HTMLDivElement>();
  const handleDotsButtonClick = useCallback(() => {
    popoverToolmenu.open();
  }, [popoverToolmenu]);

  // DnD
  type Item = {
    from: Path
  };
  const [_, dragRef] = useDrag<Item>(() => {
    return {
      type: 'Element',
      item: {
        from: path,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  }, [path.toString()]);
  const [{
    isDroppable,
    isOver,
  }, dropRef] = useDrop<Item, void, { isDroppable: boolean; isOver: boolean }>(() => {
    return {
      accept: 'Element',
      drop: (item) => {
        console.log(item.from, path)
        Transforms.moveNodes(editor, {
          at: item.from,
          to: path,
        });
      },
      collect: (monitor) => ({
        isDroppable: monitor.canDrop(),
        isOver: !!monitor.isOver(),
      }),
    };
  }, [editor, path.toString()]);

  return (
    <>
      <div
        {...props.attributes}
        data-type={props.element.type}
        data-path={path.toString()}
        className={styles.root}
      >
        <div className={styles.body}>{props.children}</div>
        <div className={classnames({
          [styles.dropArea]: true,
          [styles.dropAreaDroppable]: isDroppable,
          [styles.dropAreaOver]: isOver,
        })} ref={dropRef} />
        <div contentEditable={false} className={styles.utilsContainer}>
          <div className={styles.utils}>
            <div ref={popoverToolbox.targetRef}>
              <PlusButton onClick={handlePlusButtonClick} />
            </div>
            <div ref={dragRef}>
              <div ref={popoverToolmenu.targetRef}>
                <DotsButton onClick={handleDotsButtonClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popover {...popoverToolbox.bind}>
        <Toolbox path={path} />
      </Popover>
      <Popover {...popoverToolmenu.bind}>
        <Toolmenu path={path} />
      </Popover>
    </>
  );
};

const PlusButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <div className={styles.button}>
        <PlusIcon />
      </div>
    </Button>
  );
};

const DotsButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <div className={styles.button}>
        <DotsIcon />
      </div>
    </Button>
  );
};
