import { Editor, Point, Range } from 'slate';

export const deleteRange = (editor: Editor, range: Range): Point | null => {
  if (Range.isCollapsed(range)) {
    return range.anchor;
  } else {
    const [, end] = Range.edges(range);
    const pointRef = Editor.pointRef(editor, end);
    editor.delete({ at: range });
    return pointRef.unref();
  }
};
