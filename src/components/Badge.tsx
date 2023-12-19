import { ReactNode } from "react";

type Props = {
  className: string;
  children: ReactNode;
};

const Badge = ({ className, children }: Props) => {
  return (
    <div
      className={`flex justify-center items-center rounded-full p-3 text-lg ${
        className && className
      }`}
    >
      {children}
    </div>
  );
};

export default Badge;
