import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils";

const inputBaseStyles =
  "w-full h-12 rounded-xl bg-input border border-border text-foreground placeholder:text-input-placeholder focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all duration-200";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
  inputClassName?: string;
};

const Input = ({
  label,
  error,
  leftIcon,
  rightSlot,
  className,
  inputClassName,
  id: idProp,
  ...props
}: InputProps) => {
  const id = idProp ?? props.name;
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightSlot = Boolean(rightSlot);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-muted-foreground-subtle"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none [&>svg]:w-5 [&>svg]:h-5">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          className={cn(
            inputBaseStyles,
            hasLeftIcon && "pl-11",
            hasRightSlot ? "pr-12" : "pr-4",
            error && "border-destructive/50 focus:ring-destructive/50 focus:border-destructive/50",
            inputClassName
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>
      {error && (
        <p id={id ? `${id}-error` : undefined} className="text-sm text-destructive-foreground">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
