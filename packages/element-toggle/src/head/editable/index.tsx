import { Element, ElementContainer, helpers } from '@bento-editor/core';
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
      <ElementContainer {...props}>
        <div className={styles.root}>
          <div className={styles.ctrl} contentEditable={false}>
            <button onClick={handleCtrlClick}>
              {parentElement.attributes?.isOpen ? 'open' : 'close'}
            </button>
          </div>
          <div className={styles.body}>{props.children}</div>
        </div>
      </ElementContainer>
    );
  },
};
export default editable;
