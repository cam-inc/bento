import { CustomElement, Element, ElementContainer } from '@bento-editor/core';
import { createContext } from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';

export const ContainerContext = createContext<CustomElement<Attributes>>({
  type: 'toggle',
  children: [],
});

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'toggle-head',
      attributes: {},
      children: [
        {
          type: 'format',
          text: '入力してください',
        },
      ],
    },
    {
      type: 'toggle-body',
      attributes: {},
      children: [
        {
          type: 'format',
          text: '入力してください',
        },
      ],
    },
  ],
  Component: (props) => {
    return (
      <ElementContainer {...props} utilsPositionY={4}>
        <ContainerContext.Provider value={props.element}>
          <div className={styles.root}>{props.children}</div>
        </ContainerContext.Provider>
      </ElementContainer>
    );
  },
};
export default editable;
