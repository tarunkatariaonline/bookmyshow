import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils";

const baseStyles =
  "inline-flex items-center justify-center gap-2 h-12 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover focus:ring-primary",
  outline:
    "border border-border bg-muted text-muted-foreground-subtle font-medium hover:bg-muted hover:border-border-hover focus:ring-ring focus:border-primary",
  ghost: "text-muted-foreground-subtle hover:text-foreground hover:bg-muted",
  /** No variant styles — use className for full control */
  custom: "",
} as const;

type ButtonVariant = keyof typeof variants;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
};

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button = ({
  variant = "primary",
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth,
  className,
  children,
  disabled,
  type,
  ...props
}: ButtonProps) => {
  const isCustom = variant === "custom";

  return (
    <button
      type={type ?? "button"}
      disabled={disabled ?? isLoading}
      className={cn(
        !isCustom && baseStyles,
        variants[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner />
          {loadingText}
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;
