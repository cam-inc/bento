import { EditorPlugin } from '.';

export const withOriginalIsVoid: EditorPlugin = (editor, config) => {
  const originalIsVoid = editor.isVoid;
  editor.isVoid = (elementNode) => {
    const { elements } = config;
    const element = elements.find((element) => {
      return element.type === elementNode.type;
    });
    if (element && element.isVoid) {
      return true;
    }
    return originalIsVoid(elementNode);
  };
  return editor;
};
