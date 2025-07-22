import React, { ButtonHTMLAttributes } from "react";
import "../styles/button.css";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  fullWidth = false,
  className = "",
  disabled = false,
  ...props
}) => {
  const buttonClasses = [
    "button-base",
    `button-${variant}`,
    `button-${size}`,
    isLoading ? "button-loading" : "",
    disabled ? "button-disabled" : "",
    fullWidth ? "button-full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="button-spinner" />}
      <span className="button-content">{children}</span>
    </button>
  );
};

export default Button;
