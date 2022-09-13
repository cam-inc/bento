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
};
export const Toolbox: React.FC<ToolboxProps> = ({ path }) => {
  const { elements, texts } = useConfigGlobalStateValue();

  const textsWithToolbox = texts.filter((text) =>
    Object.prototype.hasOwnProperty.call(text, 'toolbox')
  );
  const nodes = [...elements, ...textsWithToolbox];

  return (
    <div className={styles.root}>
      <div>
        <ul>
          {nodes.map((node) => (
            <li key={node.type}>
              <Button path={path} node={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Button: React.FC<{
  path: Path;
  node: Config['elements'][number] | Config['texts'][number];
}> = ({ path, node }) => {
  const editor = useSlate();
  const handleClick = useCallback(() => {
    const nextPath = Path.next(path);
    Transforms.insertNodes(
      editor,
      {
        type: node.type,
        attributes: node.attributes.defaultValue,
        children: node.editable.defaultValue ?? [],
      },
      {
        at: nextPath,
      }
    );
  }, [editor, path, node]);

  const popover = usePopover<HTMLButtonElement>();
  const handleMouseEnter = useCallback(() => {
    popover.open();
  }, [popover]);
  const handleMouseLeave = useCallback(() => {
    popover.close();
  }, [popover]);

  return (
    <>
      <button
        className={styles.button}
        ref={popover.targetRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className={styles.buttonBG} />
        <div className={styles.buttonContainer}>
          {node.toolbox && (
            <>
              <div className={styles.buttonIcon}>
                <node.toolbox.Icon />
              </div>
              <div className={styles.buttonTitle}>{node.toolbox.title}</div>
            </>
          )}
        </div>
      </button>
      <Popover {...popover.bind}>
        <ToolboxPreview element={node} />
      </Popover>
    </>
  );
};
