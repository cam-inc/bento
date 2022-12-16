import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'format',
      attributes: {},
      text: '',
    },
  ],
  Component: (props) => {
    return (
      <ElementContainer
        {...props}
        as="li"
        utilsPositionY={-2}
        emptyState={<span className={styles.emptyState}>List</span>}
      >
        <div className={styles.root}>{props.children}</div>
      </ElementContainer>
    );
  },
};
export default editable;
