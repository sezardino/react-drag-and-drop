import classNames from "classnames";
import { HTMLProps } from "react";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <button
      {...rest}
      type="button"
      className={classNames(
        "inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out",
        className
      )}
    >
      {children}
    </button>
  );
};
