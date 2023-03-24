import { CustomElement, Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'note-body',
  attributes,
  editable,
  insertBreak: (editor, entry) => {
    const { Path, Transforms, pathHelpers } = helpers;
    const [_, path] = entry;

    const rootParentPath = pathHelpers.getRootAncestorPath(path);
    const next = Path.next(rootParentPath);

    const element: CustomElement = {
      type: 'paragraph',
      children: [
        {
          type: 'format',
          text: '',
        },
      ],
    };

    Transforms.insertNodes(editor, element, { at: next });
    Transforms.select(editor, next);

    return true;
  },
  insertSoftBreak: (editor, entry) => {
    const { Path, Transforms } = helpers;
    const [_, path] = entry;
    const next = Path.next(path);

    const element: CustomElement = {
      type: 'note-body',
      children: [
        {
          type: 'format',
          text: '',
        },
      ],
    };

    Transforms.insertNodes(editor, element, { at: next });
    Transforms.select(editor, next);
    return true;
  },
};

export default element;
