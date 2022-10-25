import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: '大見出し' }],
  Component: (props) => {
    return (
      <ElementContainer {...props} utilsPositionY={7}>
        <h1 className={styles.root}>{props.children}</h1>
      </ElementContainer>
    );
  },
};
export default editable;
