import { Button, Textbox } from '@bento-editor/core';
import { useRef, useEffect } from 'react';
import { styles } from './index.css';

type FormProps = {
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
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // The submit event will be called for the second time.
  // Emitting this for doing setNodes without re-rendering recursively.
  useEffect(() => {
    if (embedTitle != null && embedTitle !== '') {
      buttonRef.current?.dispatchEvent(
        new Event('click', { cancelable: true, bubbles: true })
      );
    }
  }, [buttonRef, embedTitle]);

  return (
    <div className={styles.root}>
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
          ref={buttonRef}
        >
          {buttonValue}
        </Button>
      </div>
    </div>
  );
};
