import React from 'react';
import { Element } from 'slate';
import { EditorProps } from '../editor';

export type Renderers = {
  [key: string]: React.FC<{ children: React.ReactNode }>;
};

type Props = {
  renderers: Renderers;
  data: EditorProps['initialValue'];
};

type Data = Props['data'][number];

const hasChildren = (data: Data): data is Element => {
  return Object.prototype.hasOwnProperty.call(data, 'children');
};

const createRenderer = (renderers: Props['renderers']) => {
  const renderRecursively = (data: Data): ReturnType<React.FC> => {
    if (data.type !== undefined) {
      const Renderer = renderers[data.type];
      if (Renderer !== undefined) {
        if (hasChildren(data)) {
          const children: ReturnType<React.FC>[] = [];
          data.children.forEach((child, index) => {
            children.push(
              <React.Fragment key={index}>
                {renderRecursively(child)}
              </React.Fragment>
            );
          });
          return <Renderer>{children}</Renderer>;
        } else {
          return <Renderer>{data.text}</Renderer>;
        }
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
