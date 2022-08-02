import { css } from '@emotion/css';
import React, { useCallback } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';

export type ElementWrapperProps = RenderElementProps;
export const ElementWrapper: React.FC<ElementWrapperProps> = (props) => {
  const editor = useSlate();

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
      gap: '4px'
    })}>
      <div contentEditable={false}>
        <button>add</button>
        <button onClick={handleRemoveClick}>remove</button>
        <button>move up</button>
        <button onClick={handleInfoClick}>info</button>
      </div>
      <div className={css({
        padding: '0 4px',
        borderLeft: '1px solid lightgray'
      })}>{props.children}</div>
    </div>
  );
}
