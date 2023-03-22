import { Button, Switch, Textbox } from '@bento-editor/core';
import { useCallback, useState } from 'react';
import { styles } from './index.css';

type FormProps = {
  handleButtonClick: (href: string, text?: string, openInNew?: boolean) => void;
  labelValue: string;
  buttonValue: string;
  textboxFocus?: boolean;
  hrefPlaceholder?: string;
  textPlaceholder?: string;
  errors?: FormErrors | null;
  openInNew: boolean;
  href?: string;
  text?: string;
};

export type FormErrors = {
  reason: string;
  message: string;
};

export const Form: React.FC<FormProps> = ({
  handleButtonClick,
  textboxFocus,
  hrefPlaceholder,
  textPlaceholder,
  labelValue,
  openInNew: originalOpenInNew,
  buttonValue,
  errors,
  href: originalHref,
  text: originalText,
}) => {
  const [text, setText] = useState(originalText || '');
  const [href, setHref] = useState(originalHref || '');
  const [openInNew, setOpenInNew] = useState(originalOpenInNew);

  const handleOnChangeText = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setText(e.currentTarget.value);
  }, []);

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
          value={text}
          placeholder={textPlaceholder}
          onChange={handleOnChangeText}
        />
        <Textbox
          value={href}
          placeholder={hrefPlaceholder}
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
          onClick={() => handleButtonClick(href, text, openInNew)}
          disabled={!href}
          radius="full"
        >
          {buttonValue}
        </Button>
      </div>
    </div>
  );
};
