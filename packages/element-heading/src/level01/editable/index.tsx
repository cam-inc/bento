import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: '' }],
  Component: (props) => {
    return (
      <ElementContainer
        {...props}
        utilsPositionY={7}
        emptyState={<span className={styles.emptyState}>Heading 1</span>}
      >
        <h1 className={styles.root}>{props.children}</h1>
      </ElementContainer>
    );
  },
};
export default editable;
