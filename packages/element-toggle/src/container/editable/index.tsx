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
          text: 'default head',
        },
      ],
    },
    {
      type: 'toggle-body',
      attributes: {},
      children: [
        {
          type: 'format',
          text: 'default body',
        },
      ],
    },
  ],
  Component: (props) => {
    return (
      <ElementContainer {...props}>
        <ContainerContext.Provider value={props.element}>
          <div className={styles.root}>{props.children}</div>
        </ContainerContext.Provider>
      </ElementContainer>
    );
  },
};
export default editable;
