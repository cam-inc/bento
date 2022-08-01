import React from 'react';
import { Editable as SlateReactEditable } from 'slate-react';

// EditablePropsがslate-reactからexportされていないので。
type SlateReactEditableProps = React.ComponentProps<typeof SlateReactEditable>;

export type EditableProps = {
  renderElement: NonNullable<SlateReactEditableProps['renderElement']>;
  renderLeaf: NonNullable<SlateReactEditableProps['renderLeaf']>;
};
export const Editable: React.FC<EditableProps> = ({ renderElement, renderLeaf }) => {
  return (
    <SlateReactEditable renderElement={renderElement} renderLeaf={renderLeaf} />
  );
};
