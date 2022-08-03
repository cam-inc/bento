import { css } from '@emotion/css';
import React, { useCallback } from 'react';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';

export type ToolbarProps = {};
export const Toolbar: React.FC<ToolbarProps> = () => {
  const editor = useSlate();

  const handleInsertParagraphClick = useCallback(() => {
    Transforms.insertNodes(editor, {
      type: 'paragraph',
      children: [{ text: 'paragraph' }]
    });
  }, [editor]);

  const handleInsertHeadingClick = useCallback(() => {
    Transforms.insertNodes(editor, {
      type: 'heading',
      children: [{ text: 'heading' }]
    });
  }, [editor]);

  return (
    <div className={css({
      display: 'flex',
      paddingBottom: '4px',
      borderBottom: '1px solid gray'
    })}>
      <button onClick={handleInsertParagraphClick}>Insert Paragraph</button>
      <button onClick={handleInsertHeadingClick}>Insert Heading</button>
    </div>
  );
};
