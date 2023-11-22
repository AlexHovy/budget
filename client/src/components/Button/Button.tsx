import React from "react";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  key?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  key = "",
  type = "button",
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      key={key}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
