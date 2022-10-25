import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [],
  Component: (props) => {
    return (
      <ElementContainer {...props} utilsPositionY={-12}>
        {props.children}
        <hr className={styles.root} />
      </ElementContainer>
    );
  },
};
export default editable;
