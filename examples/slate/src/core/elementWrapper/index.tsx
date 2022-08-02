import { css } from '@emotion/css';
import React, { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Path, Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';

export type ElementWrapperProps = RenderElementProps;
export const ElementWrapper: React.FC<ElementWrapperProps> = (props) => {
  const editor = useSlate();

  const [{ isDragging }, dragRef] = useDrag(() => {
    const path = ReactEditor.findPath(editor, props.element);
    return {
      type: 'Element',
      item: {
        from: path
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }
  }, [editor]);
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
  }, [editor]);

  const handleRemoveClick = useCallback(() => {
    const path = ReactEditor.findPath(editor, props.element);
    Transforms.removeNodes(editor, {
      at: path
    });
  }, [props, editor]);

  const handleInfoClick = useCallback(() => {
    console.log('editor: ', editor);
    console.log('props: ', props);
    console.log('path: ', ReactEditor.findPath(editor, props.element));
  }, [props, editor]);

  return (
    <div {...props.attributes} className={css({
      display: 'flex',
      gap: '4px',
      marginBottom: '4px',
      opacity: isDragging ? '0.25' : '1'
    })}>
      <div contentEditable={false} className={css({
        fontSize: '10px'
      })}>
        <div>
          <p>type: {props.element.type}</p>
        </div>
        <div>
          <button>add</button>
          <button ref={dragRef}>drag</button>
          <button ref={dropRef}>drop</button>
          <button onClick={handleRemoveClick}>remove</button>
          <button onClick={handleInfoClick}>info</button>
        </div>
      </div>
      <div className={css({
        padding: '0 4px',
        borderLeft: '1px solid lightgray'
      })}>{props.children}</div>
    </div>
  );
}
