import { Element, ElementContainer } from '@bento-editor/core';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{ type: 'format', text: 'default value' }],
  Component: (props) => {
    const cite = props.element.attributes?.cite;
    return (
      <ElementContainer {...props}>
        <div className={styles.root}>
          <div className={styles.blockquote}>{props.children}</div>
          {cite && (
            <div className={styles.cite} contentEditable={false}>
              {cite}
            </div>
          )}
        </div>
      </ElementContainer>
    );
  },
};
export default editable;
