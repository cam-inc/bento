import { Element, ElementContainer, ExclamationIcon } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'format',
      text: '',
    },
  ],
  Component: (props) => {
    return (
      <ElementContainer
        {...props}
        utilsPositionY={9}
        emptyState={
          <span className={styles.emptyState}>Type something...</span>
        }
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
