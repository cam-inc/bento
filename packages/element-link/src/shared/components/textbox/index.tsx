import React, { useCallback } from 'react';
import { styles } from './index.css';

type TextboxProps = {
  onChange: React.ChangeEventHandler;
  href?: string;
  placeholder?: string;
};

export const Textbox: React.FC<TextboxProps> = ({
  href,
  placeholder,
  onChange,
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
      value={href}
      onChange={onChange}
      onClick={handleTextboxClick}
    />
  );
};
