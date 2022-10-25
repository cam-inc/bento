import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'todo-list-item',
      attributes: {},
      children: [
        {
          type: 'format',
          text: 'ToDo',
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
