import { Editor, Range } from 'slate';

export const deleteRange = (editor: Editor, range: Range) => {
  if (Range.isCollapsed(range)) {
    return;
  }
  editor.delete({ at: range });
};
