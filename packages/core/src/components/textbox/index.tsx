import React, { useCallback } from 'react';
import { styles } from './index.css';

type TextboxProps = {
  onChange: React.ChangeEventHandler;
  value?: string;
  placeholder?: string;
  autoFocus?: boolean;
};

export const Textbox: React.FC<TextboxProps> = ({
  value,
  placeholder,
  onChange,
  autoFocus,
}) => {
  const handleTextboxClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
    },
    []
  );

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.root}
      value={value}
      onChange={onChange}
      onClick={handleTextboxClick}
      autoFocus={autoFocus}
    />
  );
};
