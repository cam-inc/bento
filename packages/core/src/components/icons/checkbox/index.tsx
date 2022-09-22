import React, { useCallback, useEffect, useRef, useState } from 'react';

export type CheckboxIconProps = {
  checked?: boolean;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
};

const OutlineIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 18 18">
      <path
        d="M2 18C1.45 18 0.979 17.8043 0.587 17.413C0.195667 17.021 0 16.55 0 16V2C0 1.45 0.195667 0.979 0.587 0.587C0.979 0.195667 1.45 0 2 0H16C16.55 0 17.021 0.195667 17.413 0.587C17.8043 0.979 18 1.45 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.021 17.8043 16.55 18 16 18H2ZM2 16H16V2H2V16Z"
        fill="currentColor"
      />
    </svg>
  );
};

const CheckedIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 18 18">
      <path
        d="M7.6 13.2L14.65 6.15L13.25 4.75L7.6 10.4L4.75 7.55L3.35 8.95L7.6 13.2ZM2 18C1.45 18 0.979 17.8043 0.587 17.413C0.195667 17.021 0 16.55 0 16V2C0 1.45 0.195667 0.979 0.587 0.587C0.979 0.195667 1.45 0 2 0H16C16.55 0 17.021 0.195667 17.413 0.587C17.8043 0.979 18 1.45 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.021 17.8043 16.55 18 16 18H2Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  checked: initialChecked,
  onClick,
  disabled,
}) => {
  const checkboxRef = useRef<HTMLSpanElement>(null);
  const [checked, setChecked] = useState(!!initialChecked);

  const handleCheckboxClick = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (!!disabled) {
        event.preventDefault();
        return;
      }

      if (onClick !== undefined) {
        onClick(event);
      }
      setChecked((prevState) => !prevState);
    },
    [disabled, onClick]
  );

  const handleCheckboxKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (!!disabled) {
        event.preventDefault();
        return;
      }

      console.log(event);

      if (event.key === 'Enter') {
        setChecked((prevState) => !prevState);
      }
    },
    [disabled]
  );

  useEffect(() => {
    setChecked(!!initialChecked);
  }, [initialChecked]);

  useEffect(() => {
    checkboxRef.current?.addEventListener('keydown', handleCheckboxKeydown);

    return () => {
      checkboxRef.current?.removeEventListener(
        'keydown',
        handleCheckboxKeydown
      );
    };
  }, []);

  return (
    <span
      tabIndex={!!disabled ? -1 : 0}
      onClick={handleCheckboxClick}
      role="checkbox"
      aria-checked={checked}
    >
      {checked ? <CheckedIcon /> : <OutlineIcon />}
    </span>
  );
};
