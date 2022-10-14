import {
  CheckboxIcon,
  Element,
  ElementContainer,
  helpers,
} from '@bento-editor/core';
import { useCallback } from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'format',
      attributes: {},
      text: '',
    },
  ],
  Component: (props) => {
    const checked = !!props.element.attributes?.checked;

    const setNodes = helpers.useTransformsSetNodes(props.element);
    const handleCheckboxClick = useCallback(
      (checkboxState: boolean) => {
        setNodes({
          attributes: {
            checked: checkboxState,
          },
        });
      },
      [checked]
    );

    return (
      <ElementContainer {...props}>
        <div className={styles.root}>
          <span className={styles.checkbox} contentEditable={false}>
            <CheckboxIcon checked={checked} onClick={handleCheckboxClick} />
          </span>
          {props.children}
        </div>
      </ElementContainer>
    );
  },
};
export default editable;
