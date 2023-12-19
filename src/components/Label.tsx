import React, { ReactNode } from "react";

type Props = {
  children: string | ReactNode;
};

const Label = ({ children }: Props) => {
  return <h2 className="text-2xl my-10 text-textColor">{children}</h2>;
};

export default Label;
