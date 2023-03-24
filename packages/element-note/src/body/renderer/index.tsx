import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';

export const BodyRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
}) => {
  return <p>{children}</p>;
};
