import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: '', attributes: {} }],
  Component: (props) => {
    return (
      <ElementContainer {...props} utilsPositionY={-1}>
        <p className={styles.root}>{props.children}</p>
      </ElementContainer>
    );
  },
};
export default editable;
