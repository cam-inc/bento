import React from 'react';

export type CopyIconProps = {};
export const CopyIcon: React.FC<CopyIconProps> = () => {
  return (
    <svg viewBox="0 0 17 20">
      <path d="M2 20C1.45 20 0.979 19.8043 0.587 19.413C0.195667 19.021 0 18.55 0 18V4H2V18H13V20H2ZM6 16C5.45 16 4.97933 15.8043 4.588 15.413C4.196 15.021 4 14.55 4 14V2C4 1.45 4.196 0.979 4.588 0.587C4.97933 0.195667 5.45 0 6 0H15C15.55 0 16.021 0.195667 16.413 0.587C16.8043 0.979 17 1.45 17 2V14C17 14.55 16.8043 15.021 16.413 15.413C16.021 15.8043 15.55 16 15 16H6Z" fill="currentColor" />
    </svg>
  );
};
