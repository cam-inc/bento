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
      text: 'ToDo',
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
      <ElementContainer
        {...props}
        as="li"
        utilsPositionY={-3}
        placeholder={{
          text: 'To-do',
          className: styles.placeholder,
          unselectedShown: true,
        }}
      >
        <div className={styles.root}>
          <span className={styles.checkbox} contentEditable={false}>
            <CheckboxIcon checked={checked} onClick={handleCheckboxClick} />
          </span>
          <div className={styles.text}>{props.children}</div>
        </div>
      </ElementContainer>
    );
  },
};
export default editable;
