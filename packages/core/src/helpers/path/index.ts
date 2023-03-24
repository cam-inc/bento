import { Path as SlatePath } from 'slate';

/**
 * @description To get the path of the parent directly under the Editor among one's own parents
 */
export const getRootAncestorPath = (path: SlatePath): SlatePath => {
  const isRootChild = SlatePath.isParent([], path);
  if (isRootChild) {
    return path;
  } else {
    const parentPath = SlatePath.parent(path);
    return getRootAncestorPath(parentPath);
  }
};

export default SlatePath;
