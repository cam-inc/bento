import {
  Element,
  ElementContainer,
  helpers,
  OpenerIcon,
} from '@bento-editor/core';
import { useCallback, useContext } from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';
import { ContainerContext } from '../../container/editable';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'format',
      attributes: {},
      text: '',
    },
  ],
  Component: (props) => {
    const parentElement = useContext(ContainerContext);

    const handleCtrlClick = useCallback(() => {
      props.editor.setNodes(
        {
          attributes: {
            isOpen: !parentElement.attributes?.isOpen,
          },
        },
        { at: helpers.ReactEditor.findPath(props.editor, parentElement) }
      );
    }, [JSON.stringify(props.editor), parentElement]);

    return (
      <ElementContainer
        {...props}
        utilsPositionY={4}
        emptyState={<span className={styles.emptyState}>Toggle</span>}
      >
        <div className={styles.root}>
          <div className={styles.ctrl} contentEditable={false}>
            <button
              type="button"
              className={styles.opener}
              onClick={handleCtrlClick}
            >
              <OpenerIcon isOpened={parentElement.attributes?.isOpen} />
            </button>
          </div>
          <div className={styles.body}>{props.children}</div>
        </div>
      </ElementContainer>
    );
  },
};
export default editable;
