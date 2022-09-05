import React from 'react';

type Props = {
  children: React.ReactNode;
};
export const TextFormatRenderer: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};
