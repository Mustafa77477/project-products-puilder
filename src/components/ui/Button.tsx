import { ReactNode } from "react";
interface Iprops extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width = "w-full", ...rest }: Iprops) => {
  return (
    <button
      className={`${className} ${width} p-2 text-white rounded-md `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
