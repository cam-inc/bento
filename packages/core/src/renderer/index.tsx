import React from 'react';
import { CustomElement, EditorProps } from '../editor';

type Type = 'paragraph' | 'heading' | 'format';

export type Renderers = {
  [key in Type]?: React.FC<{ children: React.ReactNode }>;
};
type CustomRenderers = {
  [key: string]: React.FC<{ children: React.ReactNode }>;
};

type Props = {
  renderers: Renderers & CustomRenderers;
  data: EditorProps['initialValue'];
};

type Data = Props['data'][number];

const hasChildren = (data: Data): data is CustomElement => {
  return Object.prototype.hasOwnProperty.call(data, 'children');
};

const createRenderer = (renderers: Props['renderers']) => {
  const renderRecursivly = (data: Data): ReturnType<React.FC> => {
    const Renderer = renderers[data.type];
    if (Renderer !== undefined) {
      if (hasChildren(data)) {
        for (const child of data.children) {
          return <Renderer>{renderRecursivly(child)}</Renderer>;
        }
      } else {
        return <Renderer>{data.text}</Renderer>;
      }
    } else {
      return null;
      // throw new Error("Renderer isn't provided.");
    }
    return null;
  };
  return renderRecursivly;
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
