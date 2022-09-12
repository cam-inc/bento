import React, { useCallback } from 'react';
import { Path, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { Config } from '../config';
import { Popover, usePopover } from '../portals/popover';
import { useConfigGlobalStateValue } from '../store';
import { ToolboxPreview } from './preview';
import { styles } from './index.css';

export type ToolboxProps = {
  path: Path;
}
export const Toolbox: React.FC<ToolboxProps> = ({ path }) => {
  const config = useConfigGlobalStateValue();

  return (
    <div className={styles.root}>
      <div>
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
    Transforms.insertNodes(editor, {
      type: element.type,
      attributes: element.attributes.defaultValue,
      children: element.editable.defaultValue,
    }, {
      at: nextPath
    });
  }, [editor, path, element]);

  const popover = usePopover<HTMLButtonElement>();
  const handleMouseEnter = useCallback(() => {
    popover.open();
  }, [popover]);
  const handleMouseLeave = useCallback(() => {
    popover.close();
  }, [popover]);

  return (
    <>
      <button className={styles.button} ref={popover.targetRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className={styles.buttonBG} />
        <div className={styles.buttonContainer}>
          <div className={styles.buttonIcon}>
            <element.toolbox.Icon />
          </div>
          <div className={styles.buttonTitle}>
            {element.toolbox.title}
          </div>
        </div>
      </button>
      <Popover {...popover.bind}>
        <ToolboxPreview element={element} />
      </Popover>
    </>
  );
}
