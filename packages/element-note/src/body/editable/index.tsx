import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: 'default value', attributes: {} }],
  Component: (props) => {
    return (
      <ElementContainer className={styles.root} hideUtils={true} {...props}>
        {props.children}
      </ElementContainer>
    );
  },
};
export default editable;
