import { Editor, Node as SlateNode } from 'slate';

export default SlateNode;

export const copyNode = async (editor: Editor) => {
  const dataTransfer = new DataTransfer();
  editor.setFragmentData(dataTransfer, 'copy');
  const clipboardBlobList = dataTransfer.types.map((type) => {
    return new Blob([dataTransfer.getData(type)], { type: type });
  });

  const clipBoardItem: Record<string, Blob> = {};
  const removeType = 'application/x-slate-fragment';
  clipboardBlobList
    .filter((value) => value.type !== removeType)
    .forEach((blob) => {
      clipBoardItem[blob.type] = blob;
    });
  await navigator.clipboard.write([new ClipboardItem(clipBoardItem)]);
};
