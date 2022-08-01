import React from 'react';
import { BaseText } from 'slate';
import { RenderLeafProps } from 'slate-react';

export type BoldLeaf = BaseText & {
  type: 'bold';
  active?: boolean;
};
export type BoldText = BoldLeaf;
export type BoldProps = RenderLeafProps & {
  leaf: BoldLeaf;
  text: BoldText;
};
export const Bold: React.FC<BoldProps> = ({ attributes, children }) => {
  return (
    <span {...attributes}>{children}</span>
  );
};
