import { Button, Textbox } from '@bento-editor/core';
import React, { useRef, useEffect } from 'react';
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
  embedTitle?: string | null;
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
  embedTitle,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  // The submit event will be called for the second time.
  // Emitting this for doing setNodes without re-rendering recursively.
  useEffect(() => {
    if (embedTitle != null && embedTitle !== '') {
      formRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  }, [formRef, embedTitle]);

  return (
    <form ref={formRef} className={styles.root} onSubmit={handleFormSubmit}>
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
