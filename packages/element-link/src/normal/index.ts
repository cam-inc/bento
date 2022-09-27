import { Element } from '@bento-editor/core';
import attributes, { Attributes } from './attributes';
import editable from './editable';
import toolbox from './toolbox';
export * from './renderer';

const element: Element<Attributes> = {
  type: 'link',
  attributes,
  editable,
  toolbox,
  normalizeNode: () => {
    // TODO: Allow the link included `http(s?)://`.
    return false;
  },
};

export default element;
