import React, { useCallback, useState, useMemo } from 'react';
import { Path, Transforms, Node } from 'slate';
import { useSlate } from 'slate-react';
import { Button } from '../components/button';
import { SearchIcon } from '../components/icons/search';
import { Config } from '../config';
import { Popover, usePopover } from '../portals/popover';
import { useConfigGlobalStateValue } from '../store';
import { ToolboxPreview } from './preview';
import { styles } from './index.css';

export type ToolboxProps = {
  path: Path;
  onDone: () => void;
};
export const Toolbox: React.FC<ToolboxProps> = ({ path, onDone }) => {
  const { elements, texts } = useConfigGlobalStateValue();

  const [searchValue, setSearchValue] = useState('');
  const handleSearchValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  }, []);

  const nodes = useMemo(() => {
    const textsWithToolbox = texts.filter((text) =>
      Object.prototype.hasOwnProperty.call(text, 'toolbox')
    );
    const nodes = [...elements, ...textsWithToolbox];
    if (!searchValue) {
      return nodes;
    }
    return nodes.filter((node) => {
      return node.toolbox?.title.includes(searchValue);
    });
  }, [elements, texts, searchValue])

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
        <input className={styles.searchInput} value={searchValue} onChange={handleSearchValueChange} />
      </div>
      <div>
        <ul>
          {nodes.map((node) => (
            <li key={node.type}>
              <Item path={path} node={node} onDone={onDone} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Item: React.FC<{
  path: Path;
  node: Config['elements'][number] | Config['texts'][number];
  onDone: () => void;
}> = ({ path, node, onDone }) => {
  const editor = useSlate();
  const handleClick = useCallback(() => {
    const nextPath = Path.next(path);
    if (node.editable.defaultValue === undefined) {
      throw new Error('node.editable.defaultValue is empty.');
    }
    const defaultValue = Array.isArray(node.editable.defaultValue)
      ? { children: node.editable.defaultValue }
      : { text: node.editable.defaultValue };
    Transforms.insertNodes(
      editor,
      {
        type: node.type,
        attributes: node.attributes.defaultValue,
        ...defaultValue,
      } as Node,
      {
        at: nextPath,
      }
    );
    onDone();
  }, [editor, path, node, onDone]);

  const popover = usePopover<HTMLDivElement>({ isHorizontal: true });
  const handleMouseEnter = useCallback(() => {
    popover.open();
  }, [popover]);
  const handleMouseLeave = useCallback(() => {
    popover.close();
  }, [popover]);

  return (
    <>
      <div
        ref={popover.targetRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button onClick={handleClick}>
          <div className={styles.itemContainer}>
            {node.toolbox && (
              <>
                <div className={styles.itemIcon}>
                  <node.toolbox.Icon />
                </div>
                <div className={styles.itemTitle}>{node.toolbox.title}</div>
              </>
            )}
          </div>
        </Button>
      </div>
      <Popover {...popover.bind}>
        <ToolboxPreview element={node} />
      </Popover>
    </>
  );
};
