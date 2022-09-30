import { BentoButton, BentoSwitch, Textbox } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';
import classnames from 'classnames';

type FormProps = {
  handleFormSubmit: React.FormEventHandler;
  handleTextboxChange: React.ChangeEventHandler;
  handleCheckboxChange: React.FormEventHandler;
  handleButtonClick: React.MouseEventHandler;
  labelValue: string;
  switchChecked: boolean;
  buttonValue: string;
  textboxValue?: string;
  textboxFocus?: boolean;
  placeholder?: string;
  buttonDisabled?: boolean;
  errors?: FormErrors | null;
};

export type FormErrors = {
  reason: string;
  message: string;
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
  switchChecked,
  buttonValue,
  buttonDisabled,
  errors,
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
        {errors != null && (
          <span className={styles.errorMessage}>{errors.message}</span>
        )}
        <div className={styles.switchContainer}>
          <label>{labelValue}</label>
          <BentoSwitch
            onChange={handleCheckboxChange}
            checked={switchChecked}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <BentoButton
          onClick={handleButtonClick}
          disabled={buttonDisabled}
          className={classnames({
            [styles.buttonDisabled]: !!buttonDisabled,
          })}
        >
          {buttonValue}
        </BentoButton>
      </div>
    </form>
  );
};
