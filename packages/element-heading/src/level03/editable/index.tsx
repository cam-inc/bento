import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: '' }],
  Component: (props) => {
    return (
      <ElementContainer
        {...props}
        utilsPositionY={3}
        emptyState={<span className={styles.emptyState}>Heading 3</span>}
      >
        <h3 className={styles.root}>{props.children}</h3>
      </ElementContainer>
    );
  },
};
export default editable;
