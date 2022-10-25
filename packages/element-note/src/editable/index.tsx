import { Element, ElementContainer, ExclamationIcon } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'format',
      text: '入力してください',
    },
  ],
  Component: (props) => {
    return (
      <ElementContainer {...props} utilsPositionY={9}>
        <div className={styles.root}>
          <div className={styles.icon}>
            <ExclamationIcon type="note" />
          </div>
          <div>
            {props.children}
          </div>
        </div>
      </ElementContainer>
    );
  },
};

export default editable;
