import {
  Element,
  ElementContainer,
  helpers,
  BentoButton,
  BentoSwitch,
} from '@bento-editor/core';
import React, { useCallback, useState } from 'react';
import { Textbox } from '../../shared';
import attributes, { Attributes } from '../attributes';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'format',
      text: '',
    },
  ],
  Component: (props) => {
    const href = props.element.attributes?.href ?? attributes.defaultValue.href;
    const target =
      props.element.attributes?.target ?? attributes.defaultValue.target;
    const placeholder =
      props.element.attributes?.placeholder ??
      attributes.defaultValue.placeholder;

    const setNodes = helpers.useTransformsSetNodes(props.element);

    const [openInNew, setOpenInNew] = useState(target === '_blank');
    const [newHref, setNewHref] = useState(href);

    const handleCheckboxChange = useCallback(() => {
      setOpenInNew((prevState) => !prevState);
    }, []);

    const handleTextboxChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewHref(event.target.value);
      },
      []
    );

    const handleButtonClick = useCallback(() => {
      setNodes({
        attributes: {
          href: newHref,
          target: openInNew ? '_blank' : '_self',
        },
      });
    }, [setNodes]);

    return (
      <ElementContainer {...props}>
        <div className={styles.root}>
          <div className={styles.form} contentEditable={false}>
            <Textbox
              href={newHref}
              placeholder={placeholder}
              onChange={handleTextboxChange}
            />
            <div className={styles.switchContainer}>
              <label>新しいタブで開く</label>
              <BentoSwitch
                onChange={handleCheckboxChange}
                checked={openInNew}
              />
            </div>
          </div>
          <div contentEditable={false} className={styles.buttonContainer}>
            <BentoButton onClick={handleButtonClick}>
              リンクを作成する
            </BentoButton>
          </div>
        </div>
      </ElementContainer>
    );
  },
};

export default editable;
