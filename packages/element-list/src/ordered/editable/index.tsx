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
          text: '',
        },
      ],
    },
  ],
  Component: (props) => {
    return (
      <ElementContainer {...props}>
        <ol className={styles.root}>{props.children}</ol>
      </ElementContainer>
    );
  },
};

export default editable;
