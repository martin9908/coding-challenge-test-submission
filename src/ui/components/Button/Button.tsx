import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent } from "react";
import clsx from "clsx"; //  helps with conditional classes
import $ from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        $.button,
        variant === "primary" && $.primary,
        variant === "secondary" && $.secondary
      )}
      disabled={loading} // prevent clicks while loading
    >
      {loading ? (
        <span data-testid="loading-spinner" className={$.spinner}></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
