import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent } from "react";
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
  const variantClass =
    variant === "secondary" ? $.secondary : $.primary; // default to primary

  return (
    <button
      className={`${$.button} ${variantClass} ${loading ? $.loading : ""}`}
      type={type}
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
    >
      {loading && (
        <span
          className={$.spinner}
          data-testid="loading-spinner"
          aria-hidden="true"
        />
      )}
      <span className={$.label}>{children}</span>
    </button>
  );
};

export default Button;
