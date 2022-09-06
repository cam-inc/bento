import React from "react";

type Props = {
  children: React.ReactNode
}

export const UlRenderer: React.FC<Props> = ({ children }) => {
  return <ul>{children}</ul>;
}
