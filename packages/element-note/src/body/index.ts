import { CustomElement, Element, helpers } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'note-body',
  attributes,
  editable,
  insertBreak: (editor, entry, config) => {
    const { Path, pathHelpers } = helpers;
    const [_, path] = entry;

    const rootParentPath = pathHelpers.getRootAncestorPath(path);
    const next = Path.next(rootParentPath);

    const { defaultElement } = config;

    editor.insertNodes(
      {
        type: defaultElement.type,
        children: defaultElement.editable.defaultValue,
      },
      { at: next, select: true }
    );

    return true;
  },
  insertSoftBreak: (editor, entry) => {
    const { Path } = helpers;
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

    editor.insertNodes(element, { at: next });
    editor.select(next);
    return true;
  },
};

export default element;
