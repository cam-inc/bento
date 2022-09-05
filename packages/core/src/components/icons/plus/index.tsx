import React from 'react';

export type PlusIconProps = {};
export const PlusIcon: React.FC<PlusIconProps> = () => {
  return (
    <svg viewBox="0 0 14 14">
      <path d="M6 14V8H0V6H6V0H8V6H14V8H8V14H6Z" fill="currentColor" />
    </svg>
  );
};
