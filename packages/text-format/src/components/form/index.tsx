import { styles } from './index.css';
import React from 'react';
import { Button, Switch, Textbox } from '@bento-editor/core';

type FormProps = {
  handleFormSubmit: React.FormEventHandler;
  handleTextboxChange: React.ChangeEventHandler;
  handleSwitchChange: React.FormEventHandler;
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
  handleSwitchChange,
  handleButtonClick,
  labelValue,
  switchChecked,
  buttonValue,
  textboxValue,
  textboxFocus,
  placeholder,
  buttonDisabled,
  errors,
}) => {
  return (
    <form onSubmit={handleFormSubmit} className={styles.root}>
      <div>
        <Textbox
          value={textboxValue}
          placeholder={placeholder}
          onChange={handleTextboxChange}
          autoFocus={textboxFocus}
          required={true}
        />
        {errors != null && (
          <span className={styles.errorMessage}>{errors.message}</span>
        )}
      </div>
      <div className={styles.switchContainer}>
        <label>{labelValue}</label>
        <Switch onChange={handleSwitchChange} checked={switchChecked} />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={handleButtonClick}
          disabled={buttonDisabled}
          radius="full"
        >
          {buttonValue}
        </Button>
      </div>
    </form>
  );
};
