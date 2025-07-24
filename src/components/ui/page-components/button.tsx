import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import "../styles/button.css";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "small" | "medium" | "large";

type MergedButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof HTMLMotionProps<"button">
> &
  HTMLMotionProps<"button"> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    fullWidth?: boolean;
    children?: ReactNode; // Explicitly type children as ReactNode
  };

const Button = React.forwardRef<HTMLButtonElement, MergedButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "medium",
      isLoading = false,
      fullWidth = false,
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
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
      <motion.button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        whileHover={!disabled ? { scale: 1.05 } : undefined}
        whileTap={!disabled ? { scale: 0.95 } : undefined}
        {...props}
      >
        {isLoading && <span className="button-spinner" />}
        <span className="button-content">
          {children as ReactNode} {/* Explicit type assertion */}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
