import { RendererProps } from '@bento-editor/core';
import defaultAttributes, { Attributes } from '../attributes';

export const QuoteRenderer: React.FC<RendererProps<Attributes>> = ({
  children,
  attributes,
}) => {
  attributes = { ...defaultAttributes.defaultValue, ...attributes };

  return (
    <figure>
      <blockquote cite={attributes.cite}>{children}</blockquote>
      {attributes.cite && (
        <figcaption>
          <cite>{attributes.cite}</cite>
        </figcaption>
      )}
    </figure>
  );
};
