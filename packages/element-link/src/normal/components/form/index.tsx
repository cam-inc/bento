import { BentoButton, BentoSwitch } from '@bento-editor/core';
import React from 'react';
import { Textbox } from '../../../shared';
import { styles } from './index.css';

type FormProps = {
  handleFormSubmit: React.FormEventHandler;
  handleTextboxChange: React.ChangeEventHandler;
  handleCheckboxChange: React.FormEventHandler;
  handleButtonClick: React.MouseEventHandler;
  labelValue: string;
  checked: boolean;
  buttonValue: string;
  textboxValue?: string;
  textboxFocus?: boolean;
  placeholder?: string;
  buttonDisabled?: boolean;
};

export const Form: React.FC<FormProps> = ({
  handleFormSubmit,
  handleTextboxChange,
  handleCheckboxChange,
  handleButtonClick,
  textboxValue,
  textboxFocus,
  placeholder,
  labelValue,
  checked,
  buttonValue,
  buttonDisabled,
}) => {
  return (
    <form className={styles.root} onSubmit={handleFormSubmit}>
      <div className={styles.field}>
        <Textbox
          value={textboxValue}
          placeholder={placeholder}
          onChange={handleTextboxChange}
          autoFocus={textboxFocus}
        />
        <div className={styles.switchContainer}>
          <label>{labelValue}</label>
          <BentoSwitch onChange={handleCheckboxChange} checked={checked} />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <BentoButton
          onClick={handleButtonClick}
          disabled={buttonDisabled}
          className={buttonDisabled ? styles.buttonDisabled : ''}
        >
          {buttonValue}
        </BentoButton>
      </div>
    </form>
  );
};
