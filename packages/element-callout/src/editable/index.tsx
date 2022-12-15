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
      <ElementContainer
        {...props}
        utilsPositionY={9}
        placeholder={{
          text: 'Type something',
          className: styles.placeholder,
          unselectedShown: true,
        }}
      >
        <div className={styles.root}>
          <div className={styles.icon}>
            <ExclamationIcon type="callout" />
          </div>
          <div className={styles.text}>{props.children}</div>
        </div>
      </ElementContainer>
    );
  },
};

export default editable;
