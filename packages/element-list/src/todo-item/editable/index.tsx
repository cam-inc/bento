import { Element, ElementContainer, helpers } from '@bento-editor/core';
import React, { useCallback } from 'react';
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
    const handleCheckboxChange = useCallback(() => {
      setNodes({
        attributes: {
          checked: !checked,
        },
      });
    }, [checked]);

    return (
      <ElementContainer {...props}>
        <div className={styles.root}>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          {props.children}
        </div>
      </ElementContainer>
    );
  },
};
export default editable;
