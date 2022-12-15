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
      text: 'default head',
    },
  ],
  Component: (props) => {
    const parentElement = useContext(ContainerContext);

    const handleCtrlClick = useCallback(() => {
      helpers.Transforms.setNodes(
        props.editor,
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
        placeholder={{
          text: 'Toggle',
          className: styles.placeholder,
          unselectedShown: true,
        }}
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
