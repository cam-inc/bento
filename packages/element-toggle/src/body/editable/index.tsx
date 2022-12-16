import { Element, ElementContainer } from '@bento-editor/core';
import { useContext } from 'react';
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
    if (!parentElement.attributes?.isOpen) {
      return null;
    }
    return (
      <ElementContainer
        {...props}
        className={styles.container}
        utilsPositionY={-1}
        emptyState={
          <span className={styles.emptyState}>
            Empty toggle. Type something...
          </span>
        }
      >
        <div className={styles.root}>{props.children}</div>
      </ElementContainer>
    );
  },
};
export default editable;
