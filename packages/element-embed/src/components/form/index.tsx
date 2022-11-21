import { Button, Textbox } from '@bento-editor/core';
import { styles } from './index.css';

type FormProps = {
  handleTextboxChange: React.ChangeEventHandler;
  handleButtonClick: React.MouseEventHandler;
  buttonRef: React.MutableRefObject<HTMLButtonElement | null>;
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
  handleTextboxChange,
  handleButtonClick,
  buttonRef,
  labelValue,
  buttonValue,
  textboxValue,
  placeholder,
  buttonDisabled,
  errors,
}) => {
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
