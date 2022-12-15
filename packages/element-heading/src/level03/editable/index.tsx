import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: '小見出し' }],
  Component: (props) => {
    return (
      <ElementContainer
        {...props}
        utilsPositionY={3}
        placeholder={{
          text: 'Heading 3',
          className: styles.placeholder,
          unselectedShown: true,
        }}
      >
        <h3 className={styles.root}>{props.children}</h3>
      </ElementContainer>
    );
  },
};
export default editable;
