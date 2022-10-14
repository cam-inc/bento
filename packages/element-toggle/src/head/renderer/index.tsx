import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';

export const HeadRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
}) => {
  return <div>{children}</div>;
};
