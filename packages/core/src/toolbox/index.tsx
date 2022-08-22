import React, { useCallback } from 'react';
import { Path, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { Config } from '../config';
import { useConfigGlobalStateValue } from '../store';

export type ToolboxProps = {
  path: Path;
}
export const Toolbox: React.FC<ToolboxProps> = ({ path }) => {
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

// TODO: 再利用可能に。
const Button: React.FC<{
  path: Path;
  element: Config['elements'][number];
}> = ({ path, element }) => {
  const editor = useSlate();
  const handleClick = useCallback(() => {
    const nextPath = Path.next(path);
    Transforms.insertNodes(editor, {
      type: element.type,
      children: [],
      //children: element.editable.defaultValue,
    }, {
      at: nextPath
    });
  }, [editor, path, element]);

  return (
    <button onClick={handleClick}><element.toolbox.Icon /></button>
  );
}
