import React from "react";

type Props = {
  children: React.ReactNode;
};

export const LiRenderer: React.FC<Props> = ({children}) => {
  return <li>{children}</li>;
}
