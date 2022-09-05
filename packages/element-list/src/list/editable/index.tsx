import { Element, ElementContainer, helpers } from '@bento-editor/core';
import React from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [{
    type: 'list-item',
    attributes: {},
    children: []
  }],
  Component: (props) => {
    const listStyleType = props.element.attributes?.listStyleType;

    const setNodes = helpers.useTransformsSetNodes(props.element);
    const handleButtonClick = () => {
      setNodes({
        attributes: {
          listStyleType: 'circle'
        }
      });
    };

    /*

    const handleButtonClick = useCallback(() => {
      setNodes({
        props: {
          listStyleType: 'circle'
        }
      });
    }, [setNodes]);
    */

    return (
      <ElementContainer {...props}>
        <div contentEditable={false}>
          <div>listStyleType: {listStyleType}</div>
          <div><button onClick={handleButtonClick}>change style</button></div>
        </div>
        <ul className={styles.root}>{props.children}</ul>
      </ElementContainer>
    );
  },

};
export default editable;
