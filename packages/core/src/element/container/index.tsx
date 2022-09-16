import React, { useCallback, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Path, Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';
import { DotsIcon } from '../../components/icons/dots';
import { PlusIcon } from '../../components/icons/plus';
import { Popover, usePopover } from '../../portals/popover';
import { Toolbox } from '../../toolbox';
import { Toolmenu } from '../../toolmenu';
import { styles } from './index.css';

export type ElementContainerProps = RenderElementProps;

export const ElementContainer: React.FC<ElementContainerProps> = (props) => {
  const editor = useSlate();

  const path = useMemo(() => {
    const path = ReactEditor.findPath(editor, props.element);
    return path;
  }, [editor, props.element]);

  const popoverToolbox = usePopover<HTMLDivElement>();
  const handlePlusButtonClick = useCallback(() => {
    popoverToolbox.open();
  }, [popoverToolbox]);

  const popoverToolmenu = usePopover<HTMLDivElement>();
  const handleDotsButtonClick = useCallback(() => {
    popoverToolmenu.open();
  }, [popoverToolmenu]);

  const [_, dragRef] = useDrag(() => {
    return {
      type: 'Element',
      item: {
        from: path,
        element: props.element,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
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
          to: path,
        });
      },
    };
  }, [editor, props.element]);

  return (
    <>
      <div
        {...props.attributes}
        data-type={props.element.type}
        className={styles.root}
      >
        <div className={styles.body}>{props.children}</div>
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
            <div ref={dropRef}>drop</div>
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
    <button className={styles.button} onClick={onClick}>
      <div className={styles.buttonBG} />
      <div className={styles.buttonIcon}>
        <PlusIcon />
      </div>
    </button>
  );
};

const DotsButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <div className={styles.buttonBG} />
      <div className={styles.buttonIcon}>
        <DotsIcon />
      </div>
    </button>
  );
};
