import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: '' }],
  Component: (props) => {
    return (
      <ElementContainer
        {...props}
        utilsPositionY={5}
        emptyState={<span className={styles.emptyState}>Heading 2</span>}
      >
        <h2 className={styles.root}>{props.children}</h2>
      </ElementContainer>
    );
  },
};
export default editable;
