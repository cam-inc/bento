import { Button, Textbox } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

type FormProps = {
  handleFormSubmit: React.FormEventHandler;
  handleTextboxChange: React.ChangeEventHandler;
  handleButtonClick: React.MouseEventHandler;
  labelValue: string;
  buttonValue: string;
  textboxValue?: string;
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
  handleButtonClick,
  labelValue,
  buttonValue,
  textboxValue,
  placeholder,
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
          required={true}
        />
        {errors != null && (
          <span className={styles.errorMessage}>{errors.message}</span>
        )}
        <label>{labelValue}</label>
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
