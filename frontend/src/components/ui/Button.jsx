import React from "react";

function Button({
  onClick,
  children,
  className = "",
  type = "button",
  size = "md",
  variant = "primary",
  loading = false,
  disabled = false,
}) {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={loading || disabled}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;
