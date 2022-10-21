import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'list-item',
      attributes: {},
      children: [
        {
          type: 'format',
          text: 'リスト',
        },
      ],
    },
  ],
  Component: (props) => {
    return (
      <ElementContainer {...props}>
        <ul className={styles.root}>{props.children}</ul>
      </ElementContainer>
    );
  },
};
export default editable;
