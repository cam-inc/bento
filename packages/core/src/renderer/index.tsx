import React from 'react';
import { Element, Text } from 'slate';
import { EditorProps } from '../editor';

export type RendererProps<Attributes extends Record<string, any> = {}> = {
  children: React.ReactNode;
  attributes?: Attributes;
};

export type Renderers = {
  [key: string]: React.FC<RendererProps>;
};

type Props = {
  renderers: Renderers;
  data: EditorProps['initialValue'];
};

type Data = Props['data'][number];

const isText = (data: Data): data is Text => {
  return Object.prototype.hasOwnProperty.call(data, 'text');
};

const isElement = (data: Data): data is Element => {
  return Object.prototype.hasOwnProperty.call(data, 'children');
};

const DefaultRenderer: React.FC<RendererProps> = ({ children, attributes }) => {
  return <React.Fragment {...attributes}>{children}</React.Fragment>;
};

const createRenderer = (renderers: Props['renderers']) => {
  const renderRecursively = (data: Data): ReturnType<React.FC> => {
    if (data.type !== undefined) {
      const Renderer = renderers[data.type] ?? DefaultRenderer;
      if (isElement(data)) {
        const children: ReturnType<React.FC>[] = [];
        data.children.forEach((child, index) => {
          children.push(
            <React.Fragment key={index}>
              {renderRecursively(child)}
            </React.Fragment>
          );
        });
        return <Renderer attributes={data.attributes}>{children}</Renderer>;
      } else if (isText(data)) {
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

export const EditorRenderer: React.FC<Props> = ({ renderers, data }) => {
  const render = createRenderer(renderers);
  return (
    <div>
      {data.map((d, index) => (
        <React.Fragment key={index}>{render(d)}</React.Fragment>
      ))}
    </div>
  );
};
