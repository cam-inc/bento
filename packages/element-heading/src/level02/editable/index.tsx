import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: '中見出し' }],
  Component: (props) => {
    return (
      <ElementContainer {...props} utilsPositionY={5}>
        <h2 className={styles.root}>{props.children}</h2>
      </ElementContainer>
    );
  },
};
export default editable;
