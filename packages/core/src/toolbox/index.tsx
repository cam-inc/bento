import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Path, Transforms, Node } from 'slate';
import { useSlate } from 'slate-react';
import { Button } from '../components/button';
import { SearchIcon } from '../components/icons/search';
import { Config } from '../config';
import { Popover, usePopover } from '../portals/popover';
import { useConfigGlobalStateValue } from '../store';
import { ToolboxPreview } from './preview';
import { styles } from './index.css';
import { CustomNode } from '../toolbar';

export type ToolboxProps = {
  path: Path;
  onDone: () => void;
  node?: Node | CustomNode | null;
  isInToolbar?: boolean;
  setNode?: React.Dispatch<React.SetStateAction<Node | CustomNode | null>>;
};
export const Toolbox: React.FC<ToolboxProps> = ({
  path,
  onDone,
  node,
  isInToolbar,
  setNode,
}) => {
  const { elements, texts } = useConfigGlobalStateValue();
  const [searchValue, setSearchValue] = useState('');
  const handleSearchValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.currentTarget.value);
    },
    []
  );

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
  }, [elements, texts, searchValue]);

  useEffect(() => {
    if (node != null && setNode !== undefined) {
      const found = nodes.find((n) => n.type === (node as CustomNode).type);
      if (found !== undefined) {
        setNode(found);
      }
    }
  }, [nodes, node, setNode]);

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
        <input
          className={styles.searchInput}
          value={searchValue}
          onChange={handleSearchValueChange}
        />
      </div>
      <div>
        <ul>
          {nodes.map((node) => (
            <li key={node.type}>
              <Item
                path={path}
                node={node}
                onDone={onDone}
                isInToolbar={!!isInToolbar}
              />
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
  onDone: (params?: {
    node: Config['elements'][number] | Config['texts'][number];
  }) => void;
  isInToolbar: boolean;
}> = ({ path, node, onDone, isInToolbar }) => {
  const editor = useSlate();

  const findRootPath = useCallback(
    (path: Path): Path => {
      if (path.length > 1) {
        return findRootPath(Path.parent(path));
      } else {
        return path;
      }
    },
    [path]
  );

  const handleClick = useCallback(() => {
    const nextPath = Path.next(path);
    if (node.editable.defaultValue === undefined) {
      throw new Error('node.editable.defaultValue is empty.');
    }
    const defaultValue = Array.isArray(node.editable.defaultValue)
      ? { children: node.editable.defaultValue }
      : { text: node.editable.defaultValue };
    if (isInToolbar) {
      const rootPath = findRootPath(path);
      Transforms.removeNodes(editor, { at: rootPath });
      Transforms.insertNodes(
        editor,
        {
          type: node.type,
          attributes: node.attributes.defaultValue,
          ...defaultValue,
        } as Node,
        {
          at: rootPath,
        }
      );
      onDone();
    } else {
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
    }
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
