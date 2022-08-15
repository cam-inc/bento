import React, { useCallback } from 'react';
import { Path, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { Config } from '../config';
import { useConfigGlobalStateValue } from '../store';

export type ToolbarProps = {
  path: Path;
}
export const Toolbar: React.FC<ToolbarProps> = ({ path }) => {
  const config = useConfigGlobalStateValue();

  return (
    <div>
      <div>
        <div>elements:</div>
        <ul>
          {config.elements.map((element) => (
            <li key={element.type}>
              <Button path={path} element={element} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Button: React.FC<{
  path: Path;
  element: Config['elements'][number];
}> = ({ path, element }) => {
  const editor = useSlate();
  const handleClick = useCallback(() => {
    const nextPath = Path.next(path);
    console.log(path, nextPath);
    Transforms.insertNodes(editor, {
      type: element.type,
      children: [{ text: element.type }]
    }, {
      at: nextPath
    });
  }, [editor, path, element]);

  return (
    <button onClick={handleClick}>{element.type}</button>
  );
}
