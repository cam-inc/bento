import { BentoButton, Textbox } from '@bento-editor/core';
import React from 'react';
import classnames from 'classnames';
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
        />
        {errors != null && (
          <span className={styles.errorMessage}>{errors.message}</span>
        )}
        <label>{labelValue}</label>
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
