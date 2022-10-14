import { RendererProps } from '@bento-editor/core';
import { Attributes } from '../attributes';

export const Level02Renderer: React.FC<RendererProps<Attributes>> = ({
  children,
}) => {
  return <h2>{children}</h2>;
};
