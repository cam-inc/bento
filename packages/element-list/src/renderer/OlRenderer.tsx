import React from "react";

type Props = {
  children: React.ReactNode
}

export const OlRenderer: React.FC<Props> = ({children}) => {
  return <ol>{children}</ol>;
}
