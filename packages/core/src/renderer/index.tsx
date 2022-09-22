import React from 'react';
import { Descendant } from 'slate';
import { Config } from '../config';
import { EditorProps } from '../editor';
import { helpers } from '../helpers';
import { GlobalStateProvider } from '../store';
import { Theme } from '../theme';

export type RendererProps<Attributes extends Record<string, any> = {}> = {
  children: React.ReactNode;
  attributes?: Attributes;
};

export type Renderers = {
  [key: string]: React.FC<RendererProps>;
};

type Props = {
  config: Config;
  renderers: Renderers;
  data: EditorProps['initialValue'];
};

const DefaultElementRenderer: React.FC<RendererProps> = ({
  children,
  attributes,
}) => {
  return <div {...attributes}>{children}</div>;
};

const DefaultTextRenderer: React.FC<RendererProps> = ({
  children,
  attributes,
}) => {
  return <span {...attributes}>{children}</span>;
};

const createRenderer = (renderers: Props['renderers']) => {
  const renderRecursively = (data: Descendant): ReturnType<React.FC> => {
    if (data.type !== undefined) {
      if (helpers.isElement(data)) {
        const Renderer = renderers[data.type] ?? DefaultElementRenderer;
        const children: ReturnType<React.FC>[] = [];
        data.children.forEach((child, index) => {
          children.push(
            <React.Fragment key={index}>
              {renderRecursively(child)}
            </React.Fragment>
          );
        });
        return <Renderer attributes={data.attributes}>{children}</Renderer>;
      } else if (helpers.isText(data)) {
        const Renderer = renderers[data.type] ?? DefaultTextRenderer;
        return <Renderer attributes={data.attributes}>{data.text}</Renderer>;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  return renderRecursively;
};

export const EditorRenderer: React.FC<Props> = ({
  config,
  renderers,
  data,
}) => {
  const render = createRenderer(renderers);
  return (
    <GlobalStateProvider>
      <Theme
        token={config.themeToken}
        render={(style) => (
          <div style={style}>
            {data.map((d, index) => (
              <React.Fragment key={index}>{render(d)}</React.Fragment>
            ))}
          </div>
        )}
      />
    </GlobalStateProvider>
  );
};
