import { Button, Switch, Textbox } from '@bento-editor/core';
import { styles } from './index.css';

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
          required={true}
        />
        {errors != null && (
          <span className={styles.errorMessage}>{errors.message}</span>
        )}
        <div className={styles.switchContainer}>
          <label>{labelValue}</label>
          <Switch onChange={handleCheckboxChange} checked={switchChecked} />
        </div>
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
