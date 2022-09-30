import React from 'react';

export type SearchIconProps = {};
export const SearchIcon: React.FC<SearchIconProps> = () => {
  return (
    <svg viewBox="0 0 20 20">
      <path d="M15.938 17L10.958 12.021C10.5413 12.3263 10.083 12.566 9.583 12.74C9.083 12.9133 8.55533 13 8 13C6.61133 13 5.43067 12.514 4.458 11.542C3.486 10.5693 3 9.38867 3 8C3 6.61133 3.486 5.43067 4.458 4.458C5.43067 3.486 6.61133 3 8 3C9.38867 3 10.5693 3.486 11.542 4.458C12.514 5.43067 13 6.61133 13 8C13 8.55533 12.9133 9.083 12.74 9.583C12.566 10.083 12.3263 10.5413 12.021 10.958L17 15.938L15.938 17ZM8 11.5C8.972 11.5 9.79833 11.1597 10.479 10.479C11.1597 9.79833 11.5 8.972 11.5 8C11.5 7.028 11.1597 6.20167 10.479 5.521C9.79833 4.84033 8.972 4.5 8 4.5C7.028 4.5 6.20167 4.84033 5.521 5.521C4.84033 6.20167 4.5 7.028 4.5 8C4.5 8.972 4.84033 9.79833 5.521 10.479C6.20167 11.1597 7.028 11.5 8 11.5Z" fill="currentColor" />
    </svg>
  );
};
