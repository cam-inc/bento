const Rightward: React.FC = () => {
  return (
    <svg viewBox="0 0 32 32">
      <g>
        <path d="M13.3333 22.6656V9.33228L19.9999 15.9989L13.3333 22.6656Z" fill="currentColor" />
      </g>
    </svg>
  );
};

const Downward: React.FC = () => {
  return (
    <svg viewBox="0 0 32 32">
      <path d="M15.9999 19.9999L9.33325 13.3333H22.6666L15.9999 19.9999Z" fill="currentColor" />
    </svg>
  );
};

export type OpenerIconProps = {
  isOpened?: boolean;
};

export const OpenerIcon: React.FC<OpenerIconProps> = ({ isOpened = false }) => {
  if (isOpened) {
    return <Downward />
  } else {
    return <Rightward />
  }
};
