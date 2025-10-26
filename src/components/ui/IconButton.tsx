// src/components/ui/IconButton.tsx
import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function IconButton({
  children,
  className = "",
  ...props
}: IconButtonProps) {
  const baseClasses = [
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:bg-accent hover:text-accent-foreground",
    "h-10 w-10",
  ].join(" ");

  return (
    <button className={`${baseClasses} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
