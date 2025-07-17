import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function Button({ children, type = "button", variant = "primary", onClick, className = "", disabled = false }: ButtonProps) {
  const baseClasses = "px-8 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
}
