interface AlertProps {
  children?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
}

export const Alert = ({ children, variant = "default", size = "md" }: AlertProps) => {
  // Variant styles
  const variantStyles = {
    default: "bg-[#D2EBF0] text-foreground border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-[#fff3cd] text-foreground border-yellow-200",
  };

  // Size styles
  const sizeStyles = {
    sm: "p-3 text-sm",
    md: "p-5 text-base",
    lg: "p-6 text-lg",
  };

  const baseStyles = "rounded-[5px] text-start border";

  return <div className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}>{children}</div>;
};
