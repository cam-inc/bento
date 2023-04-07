import classnames from 'classnames';
import {
  ElementType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Path, Transforms } from 'slate';
import {
  ReactEditor,
  RenderElementProps,
  useSelected,
  useSlate,
} from 'slate-react';
import { Button } from '../../components/button';
import { DotsIcon } from '../../components/icons/dots';
import { PlusIcon } from '../../components/icons/plus';
import { helpers } from '../../helpers';
import { Popover, usePopover } from '../../portals/popover';
import { Toolbox } from '../../toolbox';
import { Toolmenu } from '../../toolmenu';
import { styles } from './index.css';

export type ElementContainerProps = RenderElementProps & {
  utilsPositionY?: number;
  className?: string;
  as?: ElementType;
  emptyState?: React.ReactNode;
  hideUtils?: boolean;
};

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
  const handleToolboxDone = useCallback(() => {
    popoverToolbox.close();
  }, [popoverToolbox]);

  const popoverToolmenu = usePopover<HTMLDivElement>();
  const handleDotsButtonClick = useCallback(() => {
    popoverToolmenu.open();
  }, [popoverToolmenu]);
  const handleToolmenuDone = useCallback(() => {
    popoverToolmenu.close();
  }, [popoverToolmenu]);

  const isSelected = useSelected();
  const isEmpty = helpers.Editor.isEmpty(editor, props.element);

  // DnD
  const type = 'Element';
  type Item = {
    from: Path;
  };
  const [_, dragRef, dragPreview] = useDrag<Item>(() => {
    return {
      type,
      item: {
        from: path,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  }, [path.toString()]);
  const [aboveCollect, aboveDropRef] = useDrop<
    Item,
    void,
    { isDroppable: boolean; isOver: boolean }
  >(() => {
    return {
      accept: type,
      drop: (item) => {
        Transforms.moveNodes(editor, {
          at: item.from,
          to: path,
        });
      },
      canDrop: (/*item, monitor*/) => {
        const lastIndex = path[path.length - 1];
        if (lastIndex === 0) {
          return true;
        } else {
          return false;
        }
      },
      collect: (monitor) => ({
        isDroppable: monitor.canDrop(),
        isOver: !!monitor.isOver(),
      }),
    };
  }, [editor, path.toString()]);
  const [belowCollect, belowDropRef] = useDrop<
    Item,
    void,
    { isDroppable: boolean; isOver: boolean }
  >(() => {
    return {
      accept: type,
      drop: (item) => {
        const result = Path.compare(item.from, path);
        let to: Path;
        switch (result) {
          case -1:
          case 0:
            to = path;
            break;
          case 1:
            to = Path.next(path);
            break;
        }
        Transforms.moveNodes(editor, {
          at: item.from,
          to,
        });
      },
      collect: (monitor) => ({
        isDroppable: monitor.canDrop(),
        isOver: !!monitor.isOver(),
      }),
    };
  }, [editor, path.toString()]);
  const bodyRef = useRef(null);
  useEffect(() => {
    dragPreview(bodyRef.current);
  }, []);

  const [isOver, setIsOver] = useState<boolean>(false);
  const handleMouseOver = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOver(true);
  }, []);
  const handleMouseOut = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOver(false);
  }, []);

  const TagName = props.as || 'div';

  return (
    <>
      <TagName
        {...props.attributes}
        data-type={props.element.type}
        data-path={path.toString()}
        className={classnames(styles.root, props.className)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div
          className={classnames(styles.dropArea, styles.dropAreaAbove)}
          ref={aboveDropRef}
        >
          <div
            className={classnames({
              [styles.dropAreaInner]: true,
              [styles.dropAreaInnerDroppable]: aboveCollect.isDroppable,
              [styles.dropAreaInnerOver]: aboveCollect.isOver,
            })}
          />
        </div>
        <div
          className={classnames({
            [styles.body]: true,
            [styles.bodyPatched]: props.as === 'li',
          })}
          ref={bodyRef}
        >
          {isEmpty && isSelected && !props.emptyState && (
            <div contentEditable={false} className={styles.bodyPlaceholder}>
              Type something
            </div>
          )}
          {isEmpty && <div contentEditable={false}>{props.emptyState}</div>}
          {props.children}
        </div>
        <div
          className={classnames(styles.dropArea, styles.dropAreaBelow)}
          ref={belowDropRef}
        >
          <div
            className={classnames({
              [styles.dropAreaInner]: true,
              [styles.dropAreaInnerDroppable]: belowCollect.isDroppable,
              [styles.dropAreaInnerOver]: belowCollect.isOver,
            })}
          />
        </div>
        <div
          contentEditable={false}
          className={classnames({
            [styles.utilsContainer]: true,
            [styles.utilsContainerOver]: !props.hideUtils && isOver,
          })}
          style={{
            top: `${props.utilsPositionY ?? 0}px`,
          }}
        >
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
      </TagName>
      <Popover {...popoverToolbox.bind}>
        <Toolbox path={path} onDone={handleToolboxDone} />
      </Popover>
      <Popover {...popoverToolmenu.bind}>
        <Toolmenu path={path} onDone={handleToolmenuDone} />
      </Popover>
    </>
  );
};

const PlusButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Button radius="small" onClick={onClick}>
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
    <Button radius="small" onClick={onClick}>
      <div className={styles.button}>
        <DotsIcon />
      </div>
    </Button>
  );
};
