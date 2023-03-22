import { Button, Switch, Textbox } from '@bento-editor/core';
import { useCallback, useState } from 'react';
import { styles } from './index.css';

type FormProps = {
  handleButtonClick: (href: string, openInNew: boolean) => void;
  labelValue: string;
  buttonValue: string;
  textboxFocus?: boolean;
  placeholder?: string;
  errors?: FormErrors | null;
  openInNew: boolean;
  href?: string;
};

export type FormErrors = {
  reason: string;
  message: string;
};

export const Form: React.FC<FormProps> = ({
  handleButtonClick,
  textboxFocus,
  placeholder,
  labelValue,
  openInNew: originalOpenInNew,
  buttonValue,
  errors,
  href: originalHref,
}) => {
  const [href, setHref] = useState(originalHref || '');
  const [openInNew, setOpenInNew] = useState(originalOpenInNew);

  const handleOnChangeHref = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setHref(e.currentTarget.value);
  }, []);

  const handleOnChangeCheckbox = useCallback<
    NonNullable<React.ComponentProps<typeof Switch>['onChange']>
  >(() => {
    setOpenInNew((cur) => !cur);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <Textbox
          value={href}
          placeholder={placeholder}
          onChange={handleOnChangeHref}
          autoFocus={textboxFocus}
          required={true}
        />
        {errors != null && (
          <span className={styles.errorMessage}>{errors.message}</span>
        )}
        <div className={styles.switchContainer}>
          <label>{labelValue}</label>
          <Switch onChange={handleOnChangeCheckbox} checked={openInNew} />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => handleButtonClick(href, openInNew)}
          disabled={!href}
          radius="full"
        >
          {buttonValue}
        </Button>
      </div>
    </div>
  );
};
