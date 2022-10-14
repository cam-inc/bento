import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';

export const EmojiRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
}) => {
  return <span role="image">{children}</span>;
};
