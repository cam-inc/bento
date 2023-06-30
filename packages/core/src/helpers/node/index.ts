import { Editor, Node as SlateNode } from 'slate';

export default SlateNode;

export const copySelectedNodeToClipBoard = async (editor: Editor) => {
  const dataTransfer = new DataTransfer();
  const fragment = editor.getFragment();
  editor.setFragmentData(dataTransfer, 'copy');
  const clipboardBlobList = dataTransfer.types.map((type) => {
    console.log('dataTranf', dataTransfer.getData(type));
    return new Blob([dataTransfer.getData(type)], { type });
  });

  const clipBoardItem: Record<string, Blob> = {};
  const removeType = 'application/x-slate-fragment';
  clipboardBlobList
    .filter((blob) => blob.type !== removeType)
    .forEach((blob) => {
      clipBoardItem[blob.type] = blob;
    });
  await navigator.clipboard.write([new ClipboardItem(clipBoardItem)]);
};
